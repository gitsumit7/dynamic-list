const input = document.getElementById("itemInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("list");

function addItem() {
    const value = input.value.trim();

    if (!value) {
        input.focus();
        return;
    }

    const li = document.createElement("li");
    const text = document.createElement("span");
    const deleteButton = document.createElement("button");

    text.className = "item-text";
    text.textContent = value;
    text.title = "Click to edit";

    text.addEventListener("click", () => {
        if (li.querySelector(".edit-input")) return;

        const editInput = document.createElement("input");
        const originalText = text.textContent;
        editInput.className = "edit-input";
        editInput.type = "text";
        editInput.value = originalText;
        editInput.setAttribute("aria-label", "Edit list item");
        text.replaceWith(editInput);
        editInput.focus();
        editInput.select();

        let finished = false;
        const finishEditing = (save) => {
            if (finished) return;
            finished = true;
            const updatedText = editInput.value.trim();
            text.textContent = save && updatedText ? updatedText : originalText;
            editInput.replaceWith(text);
        };

        editInput.addEventListener("keydown", (event) => {
            if (event.key === "Enter") finishEditing(true);
            if (event.key === "Escape") finishEditing(false);
        });
        editInput.addEventListener("blur", () => finishEditing(true), { once: true });
    });

    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete";
    deleteButton.addEventListener("click", () => li.remove());

    li.append(text, deleteButton);
    list.append(li);
    input.value = "";
    input.focus();
}

addBtn.addEventListener("click", addItem);
input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") addItem();
});
