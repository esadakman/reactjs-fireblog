import { useState } from "react";
import NewBlogStyle from "./pagesStyles/NewBlog.module.scss";
import { push, ref, set } from "firebase/database";
import { auth, db } from "../helpers/firebase";
import { useNavigate } from "react-router-dom";
import { toastSuccess, toastWarn } from "../helpers/customToastify";

const NewBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  // Bilgi Ekleme
  if (title.length >= 21) {
    // setTitle(title.slice(0, 19));
    toastWarn("Title must be at most 20 characters");
  }
  const AddBlog = (e) => {
    e.preventDefault();

    if (title && description && imageUrl) {
      const userRef = ref(db, "blog/");
      const newUserRef = push(userRef);
      set(newUserRef, {
        title: title,
        description: description,
        imageUrl: imageUrl,
        author: {
          name: auth.currentUser.displayName,
          id: auth.currentUser.uid,
        },
        createdAt: new Date().toLocaleString("en-us", {
          month: "long",
          year: "numeric",
          day: "numeric",
        }),
        likes: 0,
        fav: [""],
      });
      setTitle("");
      setDescription("");
      setImageUrl("");
      navigate("/");
      toastSuccess("Your post successfulyy published. ");
    } else {
      toastWarn("Please fill out all fields.");
    }
  };
  // console.log(auth.currentUser.displayName);
  return (
    <div className={NewBlogStyle["container"]}>
      <div className={NewBlogStyle["contactForm"]}>
        <h2>Add New Blog Post</h2>
        <div>
          <form /* onSubmit={(e) => createPost(e)} */>
            <input
              type="text"
              name="title"
              label="Title"
              placeholder="Title"
              required
              autoFocus
              maxLength={21}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              // type="text"
              id="image"
              label="ImageUrl"
              placeholder="Image URL"
              required
              type="text"
              name="image"
              className="form-control"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            <textarea
              placeholder="Content"
              // required
              // autoFocus
              margin="normal"
              id="content"
              label="Content"
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button /* type="submit" */ value="Send" onClick={AddBlog}>
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewBlog;

// const handlePublish = () => {
//   if (!formData.title || !formData.description || !formData.image) {
//     alert("Please fill all the fields");
//     return;
//   }
//   const storageRef = ref(
//     storage,
//     `/images/${Date.now()}${formData.image.name}`
//   );

//   const uploadImage = uploadBytesResumable(storageRef, formData.image);

//   uploadImage.on(
//     "state_changed",
//     (snapshot) => {
//       const progressPercent = Math.round(
//         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//       );
//       setProgress(progressPercent);
//     },
//     (err) => {
//       console.log(err);
//     },
//     () => {
//       setFormData({
//         title: "",
//         description: "",
//         image: "",
//       });

//       getDownloadURL(uploadImage.snapshot.ref).then((url) => {
//         const articleRef = collection(db, "Articles");
//         addDoc(articleRef, {
//           title: formData.title,
//           description: formData.description,
//           imageUrl: url,
//           createdAt: Timestamp.now().toDate(),
//           createdBy: userCheck.displayName,
//           userId: userCheck.uid,
//           likes: [],
//           comments: [],
//         })
//           .then(() => {
//             console.log("Article added successfully");
//             setProgress(0);
//           })
//           .catch((err) => {
//             console.log("Error adding article");
//           });
//       });
//     }
//   );
// };

// {/* <div className={NewBlogStyle["cardContainer"]}> */}
//       {/* <div className={NewBlogStyle["title"]}>
//           <h2>???????????? Details ????????????</h2>
//         </div>
//         <div className={NewBlogStyle["description"]}>
//           <h3>TITLE</h3>
//           <h6>Jul 30, 2022</h6>
//           <p>
//             Node.js, a????k kaynakl??, genelde sunucu taraf??nda ??al????an ve a??
//             ba??lant??l?? uygulamalar i??in geli??tirilmi?? bir ??al????t??rma ortam??d??r
//             (??ng. ??ngilizce: runtime environment). Node.js uygulamalar?? genelde
//             istemci taraf?? betik dili olan JavaScript kullan??larak geli??tirilir.
//             Node.js, Google V8 JavaScript motorunu kullanarak betik dilini
//             yorumlar ve i??erisinde standart olarak da????t??lan k??t??phaneler
//             sayesinde ek bir sunucu yaz??l??m??na (Apache HTTP Sunucusu, Nginx, IIS
//             vs.) gerek kalmadan uygulaman??n Web sunucusu g??revini g??r??r.
//           </p>
//         </div>
//         <div className={NewBlogStyle["cardFooter"]}> */}
//       {/* <p>@esadakman </p> */}
//       {/* </div> */}
//       {/* </div> */}
