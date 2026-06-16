const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isOpen));
    nav.classList.toggle("open", !isOpen);
  });
}

const form = document.querySelector("#consultation-form");
const note = document.querySelector("#form-note");

if (form && note) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const interests = data.getAll("interest");
    const subject = encodeURIComponent("Virtumarc Government consultation request");
    const body = encodeURIComponent(
      [
        "Consultation request",
        "",
        `Name: ${data.get("name") || ""}`,
        `Email: ${data.get("email") || ""}`,
        `Organization: ${data.get("organization") || ""}`,
        `Industry: ${data.get("industry") || ""}`,
        `Current environment: ${data.get("environment") || ""}`,
        `Estimated user count: ${data.get("users") || ""}`,
        `Interest: ${interests.length ? interests.join(", ") : "Not specified"}`,
        "",
        "Compliance goals:",
        data.get("goals") || "",
      ].join("\n")
    );

    note.textContent = "Your inquiry is ready in your email client.";
    window.location.href = `mailto:consultations@virtumarcgov.com?subject=${subject}&body=${body}`;
  });
}
