document.addEventListener("DOMContentLoaded", () => {
    const lootbox = document.getElementById("lootbox");
    const acceptButton = document.getElementById("acceptButton");
    const itemIcon = document.getElementById("itemIcon");

    function handleLootboxClick() {
        lootbox.classList.add("clicked");
        console.log("click")
        fetch("/api/items/generate/rng")
            .then((response) => response.json())
            .then((data) => {
                itemIcon.src = data.icon;
                acceptButton.setAttribute("data-name", data.name);
                acceptButton.setAttribute("data-id", data._id);
                acceptButton.className = `accept-button ${data.quality}`;
            });

        lootbox.addEventListener("animationend", function handleLootboxAnimation() {
            lootbox.style.display = "none";
            acceptButton.style.display = "flex";
            acceptButton.classList.add("show");
            lootbox.classList.remove("clicked");
            lootbox.removeEventListener("animationend", handleLootboxAnimation);
        });
    }

    function handleAcceptButtonClick() {
        const itemId = acceptButton.getAttribute("data-id");

        if (itemId) {
            fetch(`/api/inventory/items/${itemId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: "",
            })
                .then((response) => response.json())
                .then((itemData) => {
                    console.log("Fetched item details:", itemData);
                })
                .catch((error) => {
                    console.error("Error fetching item details:", error);
                });
        }

        acceptButton.classList.add("hide");

        acceptButton.addEventListener("animationend", function handleButtonAnimation() {
            acceptButton.style.display = "none";

            lootbox.style.display = "block";
            lootbox.classList.add("show");

            lootbox.removeEventListener("click", handleLootboxClick);

            acceptButton.classList.remove("hide");
            acceptButton.removeEventListener("animationend", handleButtonAnimation);

            setTimeout(() => {
                lootbox.classList.remove("show");
            }, 2000);

            setTimeout(() => {
                window.location.reload();
            }, 2500);
        });
    }

    lootbox.addEventListener("click", handleLootboxClick);
    acceptButton.addEventListener("click", handleAcceptButtonClick);
});
