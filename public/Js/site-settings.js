// ==========================================
// NED HUB - GLOBAL SITE SETTINGS
// ==========================================
// IMPORTANT:
// The main index.html already loads /api/settings
// and applies all theme/store settings.
// This file should NOT change colors or themes.
// It only provides a safe global refresh function.
// ==========================================

async function loadSiteSettings() {

    try {

        const response = await fetch("/api/settings");

        if (!response.ok) {
            throw new Error("Failed to load site settings.");
        }

        const data = await response.json();

        if (!data.success) {
            console.error(
                "Site settings error:",
                data.message || "Unable to load settings."
            );
            return;
        }

        const settings = data.settings || {};

        // Save globally so other pages/scripts can use it
        window.NED_HUB_SETTINGS = settings;

        // ==========================================
        // SHOP NAME
        // ==========================================

        const shopName =
            settings.header_store_name ||
            settings.store_name ||
            "NED HUB";

        document
            .querySelectorAll(
                "[data-shop-name], [data-store-name]"
            )
            .forEach(element => {

                element.textContent =
                    shopName;

            });


        // ==========================================
        // TAGLINE
        // ==========================================

        document
            .querySelectorAll(
                "[data-shop-tagline], [data-store-tagline]"
            )
            .forEach(element => {

                element.textContent =
                    settings.store_tagline ||
                    "Your online shopping destination.";

            });


        // ==========================================
        // PHONE
        // ==========================================

        document
            .querySelectorAll(
                "[data-shop-phone], [data-store-phone]"
            )
            .forEach(element => {

                element.textContent =
                    settings.store_phone ||
                    "";

            });


        // ==========================================
        // EMAIL
        // ==========================================

        document
            .querySelectorAll(
                "[data-shop-email], [data-store-email]"
            )
            .forEach(element => {

                element.textContent =
                    settings.store_email ||
                    "";

            });


        // ==========================================
        // ADDRESS
        // ==========================================

        document
            .querySelectorAll(
                "[data-shop-address], [data-store-address]"
            )
            .forEach(element => {

                element.textContent =
                    settings.store_address ||
                    "";

            });


        // ==========================================
        // WHATSAPP
        // ==========================================

        document
            .querySelectorAll(
                "[data-shop-whatsapp], [data-whatsapp]"
            )
            .forEach(element => {

                if (settings.whatsapp_number) {

                    const cleanNumber =
                        String(
                            settings.whatsapp_number
                        ).replace(
                            /\D/g,
                            ""
                        );

                    element.href =
                        "https://wa.me/" +
                        cleanNumber;

                    element.style.display =
                        "inline-flex";

                } else {

                    element.style.display =
                        "none";

                }

            });


        // ==========================================
        // PAGE TITLE
        // ==========================================

        document.title =
            shopName + " | Shop";


        console.log(
            "NED HUB global site settings loaded."
        );

    } catch (error) {

        console.error(
            "Site settings error:",
            error
        );

    }

}


// ==========================================
// RUN AUTOMATICALLY
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    loadSiteSettings
);