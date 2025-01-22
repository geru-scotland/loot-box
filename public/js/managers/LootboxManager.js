export default class LootboxManager {
    constructor() {
        this.lootbox = document.getElementById("lootbox");
        this.acceptButton = document.getElementById("acceptButton");
        this.itemIcon = document.getElementById("itemIcon");
        this.isLootboxClickable = true;
        this.isAcceptButtonClickable = true;
        this.init();
    }

    init() {
        this.lootbox.addEventListener("click", this.handleLootboxClick.bind(this));
        this.acceptButton.addEventListener("click", this.handleAcceptButtonClick.bind(this));
    }

    setClickable(element, clickable) {
        if (element === "lootbox")
            this.isLootboxClickable = clickable;
        if (element === "acceptButton")
            this.isAcceptButtonClickable = clickable;
    }

    handleLootboxClick() {

        if (!this.isLootboxClickable)
            return;

        this.setClickable("lootbox", false);
        this.lootbox.classList.add("clicked");

        fetch("/api/items/generate/rng")
            .then((response) => response.json())
            .then((data) => this.displayItem(data))
            .catch((error) => {
                console.error("Error fetching item:", error);
                this.setClickable("lootbox", true);
            });

        this.lootbox.addEventListener("animationend", () => this.showAcceptButton(), { once: true });
    }

    displayItem(data) {
        this.itemIcon.src = data.icon;
        this.acceptButton.setAttribute("data-name", data.name);
        this.acceptButton.setAttribute("data-id", data._id);
        this.acceptButton.className = `accept-button ${data.quality}`;
    }

    showAcceptButton() {
        this.lootbox.style.display = "none";
        this.acceptButton.style.display = "flex";
        this.acceptButton.classList.add("show");
        this.lootbox.classList.remove("clicked");
    }

    handleAcceptButtonClick() {

        if (!this.isAcceptButtonClickable)
            return;

        this.setClickable("acceptButton", false);

        const itemId = this.acceptButton.getAttribute("data-id");
        if (!itemId)
            return;

        fetch(`/api/inventory/items/${itemId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if(data.position===19){
                    setTimeout(() => {
                        window.location.reload();
                    }, 3000);
                }
                this.addItemToInventory(data);
            })
            .catch((error) => {
                console.error("Error adding item to inventory:", error);
                this.setClickable("acceptButton", true);
            });


        this.acceptButton.classList.add("hide");

        this.acceptButton.addEventListener("animationend", () => this.resetLootbox(), { once: true });
    }

    addItemToInventory(data) {
        if (data.error) {
            console.error(data.error);
            this.setClickable("acceptButton", true);
            return;
        }

        const inventorySlot = document.querySelector(
            `.inventory-slot[data-index="${data.position}"]`
        );

        if (inventorySlot) {
            inventorySlot.innerHTML = `
                  <div class="tooltip-container">
                    <img
                      src="${data.item.icon}"
                      alt="Item Icon"
                      class="item-icon ${data.item.quality} animate-scale-in"
                      data-name="${data.item.name}"
                      data-type="${data.item.type || ''}"
                      data-description="${data.item.description || ''}"
                    />
                    <div class="tooltip">
                      <h3 class="tooltip-title">${data.item.name}</h3>
                      <p class="tooltip-type">${data.item.type || ''}</p>
                      <p class="tooltip-description">${data.item.description || ''}</p>
                    </div>
                  </div>
                `;
        }
    }

    resetLootbox() {
        this.acceptButton.style.display = "none";
        this.lootbox.style.display = "block";
        this.lootbox.classList.add("show");

        setTimeout(() => {
            this.lootbox.classList.remove("show");
            this.setClickable("lootbox", true);
            this.setClickable("acceptButton", true);
        }, 2000);
    }
}