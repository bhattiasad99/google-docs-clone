import React, { useCallback, useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import useDeltaToHtmlParser from "./useDeltaToHtmlParser";
// import { io } from "socket.io-client"
import katex from "katex";
import "katex/dist/katex.min.css";

import { useParams } from "react-router-dom";

window.katex = katex;

// const SAVE_INTERVAL_MS = 2000
const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  // [{ font: [] }],
  [{ header: 1 }, { header: 2 }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline", "strike"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
  ["formula"],
];

export default function TextEditor() {
  // const { id: documentId } = useParams()
  // const [socket, setSocket] = useState()
  const [quill, setQuill] = useState();
  const conversionHandler = useDeltaToHtmlParser();
  // useEffect(() => {
  //   const s = io("http://localhost:3001")
  //   setSocket(s)

  //   return () => {
  //     s.disconnect()
  //   }
  // }, [])

  // useEffect(() => {
  //   if (socket == null || quill == null) return

  //   socket.once("load-document", document => {
  //     quill.setContents(document)
  //     quill.enable()
  //   })

  //   socket.emit("get-document", documentId)
  // }, [socket, quill, documentId])

  // useEffect(() => {
  //   if (socket == null || quill == null) return

  //   const interval = setInterval(() => {
  //     socket.emit("save-document", quill.getContents())
  //   }, SAVE_INTERVAL_MS)

  //   return () => {
  //     clearInterval(interval)
  //   }
  // }, [socket, quill])

  // useEffect(() => {
  //   if (socket == null || quill == null) return

  //   const handler = delta => {
  //     quill.updateContents(delta)
  //   }
  //   socket.on("receive-changes", handler)

  //   return () => {
  //     socket.off("receive-changes", handler)
  //   }
  // }, [socket, quill])

  // useEffect(() => {
  //   if (socket == null || quill == null) return

  //   const handler = (delta, oldDelta, source) => {
  //     if (source !== "user") return
  //     socket.emit("send-changes", delta)
  //   }
  //   quill.on("text-change", handler)

  //   return () => {
  //     quill.off("text-change", handler)
  //   }
  // }, [socket, quill])
  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;

    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    });
    // q.disable();
    q.setText("Enter text...");
    const hello = q.getContents();
    console.log("content", hello);
    setQuill(q);
  }, []);
  return (
    <>
      <button
        style={{
          zIndex: 100000000,
          width: "50px",
          height: "50px",
          position: "absolute",
          top: "calc(100vh - 10px - 50px)",
          right: "10px",
          background: "black",
          color: "white",
          borderRadius: "10px",
          boxShadow: "1px 0px 0px rgba(0,0,0,0.6)",
          fontSize: "11px",
        }}
        onClick={(e) => {
          e.preventDefault();
          const delta = quill.getContents();
          console.log(conversionHandler(delta));
        }}
      >
        GET DATA
      </button>
      <div className="container" ref={wrapperRef}></div>
    </>
  );
}
