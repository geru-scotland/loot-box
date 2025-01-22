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

                if(!response.ok)
                    throw new Error(`HTTP Error: ${response.status}`);

                return response.json();
            })
            .then(() => {

                const inventorySlots = document.querySelectorAll('.inventory-slot');
                inventorySlots.forEach(slot => {
                    slot.innerHTML = '';
                    slot.classList.add('reset-animation');
                });
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }).catch(error => {
            console.error("Error handling:", error);
        });
    });

});
