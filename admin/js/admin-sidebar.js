(function () {

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();

    const sidebar = document.getElementById("adminSidebar");

    if (!sidebar) {
        return;
    }

    sidebar.innerHTML = `
        <div class="logo">
            NED <span>HUB</span>
        </div>

        <!-- MAIN -->
        <div class="nav-title">
            Main
        </div>

        <a
            href="/admin/"
            class="nav-link"
            data-page="index.html"
        >
            📊 Dashboard
        </a>


        <!-- STORE -->
        <div class="nav-title">
            Store
        </div>

        <a
            href="/admin/products.html"
            class="nav-link"
            data-page="products.html"
        >
            📦 Products
        </a>

        <a
            href="/admin/categories.html"
            class="nav-link"
            data-page="categories.html"
        >
            🗂️ Categories
        </a>

        <a
            href="/admin/orders.html"
            class="nav-link"
            data-page="orders.html"
        >
            📦 Orders

            <span
                id="ordersBadge"
                style="
                    display:none;
                    background:#dc3545;
                    color:white;
                    border-radius:20px;
                    padding:2px 7px;
                    font-size:11px;
                    margin-left:6px;
                "
            >
                0
            </span>
        </a>

        <a
            href="/admin/payments.html"
            class="nav-link"
            data-page="payments.html"
        >
            💳 Payments
        </a>


        <!-- CUSTOMERS -->
        <div class="nav-title">
            Customers
        </div>

        <a
            href="/admin/customers.html"
            class="nav-link"
            data-page="customers.html"
        >
            👥 Customers
        </a>

        <a
            href="/admin/customer-care.html"
            class="nav-link"
            data-page="customer-care.html"
        >
            💬 Customer Care

            <span
                id="customerCareBadge"
                style="
                    display:none;
                    background:#dc3545;
                    color:white;
                    border-radius:20px;
                    padding:2px 7px;
                    font-size:11px;
                    margin-left:6px;
                "
            >
                0
            </span>
        </a>


        <!-- WEBSITE -->
        <div class="nav-title">
            Website
        </div>

        <a
            href="/admin/website.html"
            class="nav-link"
            data-page="website.html"
        >
            🌐 Website
        </a>

        <a
            href="/admin/banners.html"
            class="nav-link"
            data-page="banners.html"
        >
            🖼️ Banners
        </a>

        <a
            href="/admin/settings.html"
            class="nav-link"
            data-page="settings.html"
        >
            ⚙️ Settings
        </a>


        <!-- CUSTOMER SITE -->
        <div class="nav-title">
            Customer Site
        </div>

        <a
            href="/"
            class="nav-link"
        >
            🏠 View Store
        </a>


        <button
            id="adminLogoutButton"
            class="admin-logout-btn"
            type="button"
        >
            🚪 Logout
        </button>
    `;


    /* =========================================
       ACTIVE PAGE
    ========================================= */

    let pageForActive = currentPage;

    if (
        window.location.pathname === "/admin/" ||
        window.location.pathname === "/admin"
    ) {
        pageForActive = "index.html";
    }

    document
        .querySelectorAll(
            "#adminSidebar .nav-link[data-page]"
        )
        .forEach(link => {

            if (
                link.dataset.page === pageForActive
            ) {
                link.classList.add("active");
            }

        });


    /* =========================================
       LOGOUT
    ========================================= */

    const logoutButton =
        document.getElementById(
            "adminLogoutButton"
        );

    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            async function () {

                try {

                    const response =
                        await fetch(
                            "/api/admin/logout",
                            {
                                method: "POST",
                                credentials: "include"
                            }
                        );

                    const data =
                        await response.json();

                    if (data.success) {

                        window.location.href =
                            "/admin/login.html";

                    } else {

                        alert(
                            data.message ||
                            "Logout failed."
                        );

                    }

                } catch (error) {

                    console.error(
                        "Logout error:",
                        error
                    );

                    alert(
                        "Unable to logout."
                    );

                }

            }
        );

    }


    /* =========================================
       ORDERS BADGE
    ========================================= */

    async function updateOrdersBadge() {

        const badge =
            document.getElementById(
                "ordersBadge"
            );

        if (!badge) {
            return;
        }

        try {

            const response =
                await fetch(
                    "/api/admin/orders/notification-count",
                    {
                        credentials: "include"
                    }
                );

            if (!response.ok) {
                return;
            }

            const data =
                await response.json();

            const count =
                Number(
                    data.pending_orders || 0
                );

            if (count > 0) {

                badge.textContent =
                    count;

                badge.style.display =
                    "inline-block";

            } else {

                badge.style.display =
                    "none";

            }

        } catch (error) {

            console.error(
                "Orders badge error:",
                error
            );

        }

    }


    /* =========================================
       CUSTOMER CARE BADGE
    ========================================= */

    async function updateCustomerCareBadge() {

        const badge =
            document.getElementById(
                "customerCareBadge"
            );

        if (!badge) {
            return;
        }

        try {

            const response =
                await fetch(
                    "/api/admin/customer-care/unread-count",
                    {
                        credentials: "include"
                    }
                );

            if (!response.ok) {
                return;
            }

            const data =
                await response.json();

            const count =
                Number(
                    data.unread_count || 0
                );

            if (count > 0) {

                badge.textContent =
                    count;

                badge.style.display =
                    "inline-block";

            } else {

                badge.style.display =
                    "none";

            }

        } catch (error) {

            console.error(
                "Customer Care badge error:",
                error
            );

        }

    }


    updateOrdersBadge();
    updateCustomerCareBadge();


    setInterval(
        updateOrdersBadge,
        5000
    );

    setInterval(
        updateCustomerCareBadge,
        5000
    );

})();