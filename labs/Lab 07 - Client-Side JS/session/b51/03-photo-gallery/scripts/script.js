document.addEventListener("DOMContentLoaded", async () => {
  const addPhoto = async () => {
    const res = await fetch("https://picsum.photos/360");
    const data = await res.blob();

    const photo = document.createElement("img");
    photo.src = URL.createObjectURL(data);
    photo.addEventListener("click", () => {
      document.querySelector("#gallery").removeChild(photo);
    });
    document.querySelector("#gallery").appendChild(photo);
  };

  document.querySelector("#add-photo").addEventListener("click", addPhoto);
});
