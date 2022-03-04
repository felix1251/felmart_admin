import { useState } from "react";
import "./newProduct.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject
} from "firebase/storage";
import app from "../../firebase";
import { addProduct } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import ProgressBar from "@ramonak/react-progress-bar";
import { AddPhotoAlternate, HighlightOff, Add } from "@material-ui/icons";
import { notify } from "../../components/notify/toast";
import { CircularProgress } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
  display: 'flex',
  marginBottom: "10px",
  fontSize: "15px"
};


export default function NewProduct() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [desc, setDesc] = useState("")
  const [inputs, setInputs] = useState({});
  const [cat, setCat] = useState([]);
  const dispatch = useDispatch();
  const [data, setData] = useState([])
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState([])
  const [colors, setColors] = useState([])
  const [size, setSize] = useState([])
  const [sizeHold, setSizeHold] = useState("")
  const [colorErr, setColorErr] = useState("")
  const [colorHold, setColorHold] = useState("#FFFFFF")
  const loading = useSelector((state) => state.product.isFetching)
  const history = useHistory()

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState)
    setDesc(draftToHtml(convertToRaw(editorState.getCurrentContent())))
  };

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleCat = (e) => {
    if (e.target.value !== "none") {
      setCat((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
    } else {
      setCat([])
    }
  };

  const deleteOnImagelist = (imgL) => {
    const storage = getStorage(app);
    const desertRef = ref(storage, imgL.imgURL);
    deleteObject(desertRef).then(() => {
      console.log("deleted")
    }).catch((error) => {
      console.log(error)
    });
    setData(data.filter((img) => img.id !== imgL.id))
    if (data.length === 1) {
      setProgress(0)
    }
  }

  const handleImg = (e) => {
    const storage = getStorage(app);
    for (let i = 0; i < e.target.files.length; i++) {
      const fileName = Date.now() + "_" + e.target.files[i].name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, e.target.files[i]);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // switch (snapshot.state) {
          //   case "paused":
          //     // setStatus( (prev) => [...prev, { set: `${e.target.files[i].name} Upload is paused`}])
          //     break;
          //   case "running":
          //     // setStatus((prev) => [...prev, { set: `${e.target.files[i].name} Upload is running`}])
          //     break;
          //   default:
          // }
          const progress = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
          setProgress(progress)
          if (progress === 100) {
            setStatus((prev) => [...prev, { set: `${e.target.files[i].name} Upload is done` }])
          }
        },
        (error) => {
          console.log(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => [...prev, { id: Date.now(), imgURL: downloadURL }]);
          });
        }
      );
    }
  }

  console.log(cat)

  const handleUpload = (e) => {
    e.preventDefault()
    const sizeH = []
    const colorH = []
    if (desc && data.length > 0 && cat.length > 0) {
      size.forEach((item) => sizeH.push({ size: item.input }))
      colors.forEach((item) => sizeH.push({ color: item.input }))
      const product = { ...inputs, desc: desc, size: sizeH, color: colorH, img: data, categories: cat }
      addProduct(product, dispatch, history);
    } else {
      if (data.length === 0) {
        notify(false, "Must have product photo/s")
      }
      if (desc === "") {
        notify(false, "Must have description")
      }
      if (cat.length === 0) {
        notify(false, "Must have catergory")
      }
    }
  };

  const pushInput = () => {
    if (sizeHold !== "") {
      setSize(prev => [...prev, { id: Date.now(), input: sizeHold }])
    }
    setSizeHold("")
  }

  const colorInput = () => {
    if (colors.some(e => e.input === colorHold)) {
      setColorErr("Color already exist")
    } else {
      setColors(prev => [...prev, { id: Date.now(), input: colorHold }])
      setColorErr("")
    }
  }

  const deleteOnInputlist = (id) => {
    setSize(size.filter((s) => s.id !== id))
  }
  const deleteOnColorlist = (id) => {
    setColors(colors.filter((c) => c.id !== id))
  }


  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm" onSubmit={handleUpload}>
        <div className="addProductItemTitle">
          <label>Title</label>
          <input
            required
            name="title"
            type="text"
            className="inputItem"
            placeholder="Add a title..."
            onChange={handleChange}
          />
        </div>
        <div style={{ height: "350px", padding: "10px", width: "830px", border: "1px solid black" }} className="addProductItem inputItem">
          <div style={styles}>
            <label className="custom-file-upload">
              <input
                type="file"
                id="file"
                accept="image/*"
                onChange={handleImg}
                multiple />
              <AddPhotoAlternate style={{ marginRight: "5px" }} />Add Image
            </label>
          </div>
          <ProgressBar width="50%" bgColor="#12bd12" completed={progress} />
          <div style={{ marginTop: "10px" }}>
            {data.map((img, key) => (
              <div key={key} style={{ display: "inline", zIndex: 1, position: "relative" }}>
                <img style={{ width: "100px", height: "100px", objectFit: "cover", margin: "10px", boxShadow: "1px 1px 2px 1px gray" }} src={img.imgURL} alt="" />
                <HighlightOff onClick={() => deleteOnImagelist(img)}
                  style={{ zIndex: 2, right: 0, position: "absolute", backgroundColor: "white", borderRadius: "50%", cursor: "pointer", color: "red" }} />
              </div>
            ))}
          </div>
        </div>
        <div className="column">
          <div className="addProductItemColumn">
            <label>Price</label>
            <input
              required
              name="price"
              className="inputItem"
              type="number"
              placeholder="Add a price..."
              onChange={handleChange}
            />
          </div>
          <div className="addProductItemColumn">
            <label>Categories</label>
            <select className="inputItem" defaultValue="none" name="categories" onChange={handleCat}>
              <option value="home-appliances">Home Appliances</option>
              <option value="cloates">Clothes</option>
              <option value="gadgets">Gadgets</option>
              <option style={{ backgroundColor: "lightgray" }} value="none">None</option>
            </select>
          </div>
          <div className="addProductItemColumn">
            <label>Stock</label>
            <select className="inputItem" name="inStock" onChange={handleChange}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
        </div>
        {/* <div className="column">
          <div className="addProductItemColumn">
            <label>Color</label>
            <Select
              styles={colourStyles}
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              isSearchable
              options={colorData}
              onChange={handleColors}
            />
          </div>
        </div> */}
        <div className="column">
          <div className="addProductItemColumn2">
            <label>Color</label>
            <div style={styles} className="addSizeCont">
              <input
                type="color"
                defaultValue={colorHold}
                onChange={(e) => setColorHold(e.target.value)}
              />
              <label onClick={colorInput} className="addColor-custom">
                <Add style={{ marginRight: "5px" }} />Add
              </label>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <h4 style={{ marginLeft: "10px", color: "red" }}>{colorErr}</h4>
              </div>
            </div>
            <div className="sizeList">
              {colors.map((c, key) => (
                <div onClick={() => deleteOnColorlist(c.id)} key={key} style={{ backgroundColor: c.input, height: "35px", width: "35px", border: "1px solid black", marginLeft: "10px", borderRadius: "50%", cursor: "pointer" }} />
              ))}
            </div>
          </div>
        </div>
        <div className="column">
          <div className="addProductItemColumn2">
            <label>Size</label>
            <div style={styles} className="addSizeCont">
              <input className="inputItem addSizeInput" placeholder="Add size..." value={sizeHold} onChange={e => setSizeHold(e.target.value)} />
              <label className="addSize-custom" onClick={pushInput}>
                <Add style={{ marginRight: "5px" }} />Add
              </label>
            </div>
            <div className="sizeList">
              {size.map((s, key) => (
                <div key={key} className="sizeCard">
                  {s.input}
                  <HighlightOff onClick={() => deleteOnInputlist(s.id)}
                    style={{ marginLeft: "5px", borderRadius: "50%", cursor: "pointer", color: "white" }} />
                </div>
              ))}
            </div>
          </div>

        </div>
        <div className="addProductItem">
          <label>Description</label>
          <Editor
            placeholder="Write a desciption...."
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={onEditorStateChange}
            toolbar={{
              inline: { inDropdown: true },
              list: { inDropdown: true },
              textAlign: { inDropdown: true },
              link: { inDropdown: true },
            }}
          />
        </div>
        <button className="addProductButton">
          {loading ? <CircularProgress thickness={8} variant="indeterminate" size={20} /> : "Create"}
        </button>
      </form>
    </div>
  );
}
