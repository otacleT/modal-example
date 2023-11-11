import { useRef } from 'react';
import './App.css';

function App() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openModal = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  }

  const closeModal = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  }
  
  return (
    <>
      <button onClick={() => openModal()}>Open Modal</button>
      <dialog className='c-dialog' ref={dialogRef}>
        <h2>タイトル</h2>
        <p>このモーダルは、HTMLのdialog要素を使って実装されています。</p>
        <button onClick={() => closeModal()}>Close Modal</button>
      </dialog>
    </>
  )
}

export default App
