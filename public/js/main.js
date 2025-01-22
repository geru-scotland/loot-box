import LootboxManager from "./managers/LootboxManager.js";

document.addEventListener("DOMContentLoaded", () => {

    const lootbox = document.getElementById("lootbox");

    if(lootbox)
        new LootboxManager();

    document.querySelector('.reset-button').addEventListener('click', () => {

        fetch("/api/inventory/reset", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                console.log("RESET RECEIVING 1")
                if(!response.ok)
                    throw new Error(`HTTP Error: ${response.status}`);

                return response.json();
            })
            .then(() => {
                console.log("RESET RECEIVING 2")
                const inventorySlots = document.querySelectorAll('.inventory-slot');
                inventorySlots.forEach(slot => {
                    slot.innerHTML = '';
                    slot.classList.add('reset-animation');
                });
            }).catch(error => {
            console.error("Error handling:", error);
        });
    });

});
