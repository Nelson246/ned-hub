/* =====================================================
   NED HUB THEME CUSTOMIZER
===================================================== */

const themeColors = [
    {
        picker: "primaryColor",
        text: "primaryColorText",
        css: "--theme-primary"
    },
    {
        picker: "secondaryColor",
        text: "secondaryColorText",
        css: "--theme-secondary"
    },
    {
        picker: "accentColor",
        text: "accentColorText",
        css: "--theme-accent"
    },
    {
        picker: "backgroundColor",
        text: "backgroundColorText",
        css: "--theme-background"
    },
    {
        picker: "textColor",
        text: "textColorText",
        css: "--theme-text"
    },
    {
        picker: "buttonColor",
        text: "buttonColorText",
        css: "--theme-button"
    }
];


/* -----------------------------------------------------
   CHANGE COLOR
----------------------------------------------------- */

function updateThemePreview() {

    const primary =
        document.getElementById("primaryColor")?.value;

    const secondary =
        document.getElementById("secondaryColor")?.value;

    const accent =
        document.getElementById("accentColor")?.value;

    const background =
        document.getElementById("backgroundColor")?.value;

    const text =
        document.getElementById("textColor")?.value;

    const button =
        document.getElementById("buttonColor")?.value;


    const navbar =
        document.getElementById("previewNavbar");

    const hero =
        document.getElementById("previewHero");

    const previewButton =
        document.getElementById("previewButton");

    const preview =
        document.getElementById("themePreview");


    if (!navbar || !hero || !preview) {
        return;
    }


    /* Navbar */

    navbar.style.background = primary;


    /* Hero */

    const gradientEnabled =
        document.getElementById("gradientEnabled")?.checked;


    if (gradientEnabled) {

        hero.style.background =
            `linear-gradient(135deg, ${primary}, ${secondary})`;

    } else {

        hero.style.background = primary;

    }


    /* Preview background */

    preview.style.background = background;

    preview.style.color = text;


    /* Button */

    if (previewButton) {

        previewButton.style.background = button;

        previewButton.style.color = text;

    }


    /* Product prices */

    document
        .querySelectorAll(".preview-product > span")
        .forEach(element => {

            element.style.color = primary;

        });


    /* Product icons */

    document
        .querySelectorAll(".preview-product-image")
        .forEach(element => {

            element.style.color = primary;

        });


    /* Store CSS variables */

    document.documentElement.style.setProperty(
        "--theme-primary",
        primary
    );

    document.documentElement.style.setProperty(
        "--theme-secondary",
        secondary
    );

    document.documentElement.style.setProperty(
        "--theme-accent",
        accent
    );

    document.documentElement.style.setProperty(
        "--theme-background",
        background
    );

    document.documentElement.style.setProperty(
        "--theme-text",
        text
    );

    document.documentElement.style.setProperty(
        "--theme-button",
        button
    );
}


/* -----------------------------------------------------
   COLOR PICKERS
----------------------------------------------------- */

themeColors.forEach(theme => {

    const picker =
        document.getElementById(theme.picker);

    const textInput =
        document.getElementById(theme.text);


    if (!picker || !textInput) {
        return;
    }


    picker.addEventListener("input", function () {

        textInput.value =
            this.value.toUpperCase();

        updateThemePreview();

    });


    textInput.addEventListener("input", function () {

        let value =
            this.value.trim();


        if (
            /^#[0-9A-Fa-f]{6}$/.test(value)
        ) {

            picker.value = value;

            updateThemePreview();

        }

    });

});


/* -----------------------------------------------------
   THEME PRESETS
----------------------------------------------------- */

const themePresets =
    document.querySelectorAll(".theme-preset");


themePresets.forEach(preset => {

    preset.addEventListener("click", function () {

        const primary =
            this.dataset.primary;

        const secondary =
            this.dataset.secondary;

        const accent =
            this.dataset.accent;


        const primaryPicker =
            document.getElementById("primaryColor");

        const secondaryPicker =
            document.getElementById("secondaryColor");

        const accentPicker =
            document.getElementById("accentColor");


        const primaryText =
            document.getElementById("primaryColorText");

        const secondaryText =
            document.getElementById("secondaryColorText");

        const accentText =
            document.getElementById("accentColorText");


        if (primaryPicker) {
            primaryPicker.value = primary;
            primaryText.value = primary.toUpperCase();
        }


        if (secondaryPicker) {
            secondaryPicker.value = secondary;
            secondaryText.value = secondary.toUpperCase();
        }


        if (accentPicker) {
            accentPicker.value = accent;
            accentText.value = accent.toUpperCase();
        }


        updateThemePreview();

    });

});


/* -----------------------------------------------------
   GRADIENT TOGGLE
----------------------------------------------------- */

const gradientEnabled =
    document.getElementById("gradientEnabled");


if (gradientEnabled) {

    gradientEnabled.addEventListener(
        "change",
        updateThemePreview
    );

}


/* -----------------------------------------------------
   SAVE THEME
----------------------------------------------------- */

function saveThemeSettings() {

    const themeSettings = {

        primary:
            document.getElementById("primaryColor")?.value,

        secondary:
            document.getElementById("secondaryColor")?.value,

        accent:
            document.getElementById("accentColor")?.value,

        background:
            document.getElementById("backgroundColor")?.value,

        text:
            document.getElementById("textColor")?.value,

        button:
            document.getElementById("buttonColor")?.value,

        gradient:
            document.getElementById("gradientEnabled")?.checked,

        darkMode:
            document.getElementById("darkModeEnabled")?.checked,

        storeName:
            document.getElementById("storeName")?.value,

        tagline:
            document.getElementById("storeTagline")?.value,

        email:
            document.getElementById("storeEmail")?.value,

        phone:
            document.getElementById("storePhone")?.value

    };


    /* Temporary local storage */

    localStorage.setItem(
        "nedHubTheme",
        JSON.stringify(themeSettings)
    );


    alert(
        "NED HUB theme settings saved successfully!"
    );

}


/* -----------------------------------------------------
   SAVE BUTTONS
----------------------------------------------------- */

const saveThemeButton =
    document.getElementById("saveThemeButton");

const saveThemeButtonBottom =
    document.getElementById("saveThemeButtonBottom");


if (saveThemeButton) {

    saveThemeButton.addEventListener(
        "click",
        saveThemeSettings
    );

}


if (saveThemeButtonBottom) {

    saveThemeButtonBottom.addEventListener(
        "click",
        saveThemeSettings
    );

}


/* -----------------------------------------------------
   LOAD SAVED THEME
----------------------------------------------------- */

function loadSavedTheme() {

    const savedTheme =
        localStorage.getItem("nedHubTheme");


    if (!savedTheme) {

        updateThemePreview();

        return;

    }


    try {

        const theme =
            JSON.parse(savedTheme);


        const fields = {

            primaryColor: theme.primary,

            secondaryColor: theme.secondary,

            accentColor: theme.accent,

            backgroundColor: theme.background,

            textColor: theme.text,

            buttonColor: theme.button

        };


        Object.entries(fields).forEach(
            ([id, value]) => {

                const element =
                    document.getElementById(id);

                if (element && value) {
                    element.value = value;
                }

            }
        );


        /* Text color inputs */

        const textFields = {

            primaryColorText: theme.primary,

            secondaryColorText: theme.secondary,

            accentColorText: theme.accent,

            backgroundColorText: theme.background,

            textColorText: theme.text,

            buttonColorText: theme.button

        };


        Object.entries(textFields).forEach(
            ([id, value]) => {

                const element =
                    document.getElementById(id);

                if (element && value) {

                    element.value =
                        value.toUpperCase();

                }

            }
        );


        const gradient =
            document.getElementById(
                "gradientEnabled"
            );

        if (
            gradient &&
            typeof theme.gradient === "boolean"
        ) {

            gradient.checked =
                theme.gradient;

        }


        const darkMode =
            document.getElementById(
                "darkModeEnabled"
            );

        if (
            darkMode &&
            typeof theme.darkMode === "boolean"
        ) {

            darkMode.checked =
                theme.darkMode;

        }


        updateThemePreview();

    } catch (error) {

        console.error(
            "Could not load saved theme:",
            error
        );

    }

}


loadSavedTheme();