const inquiryInput = document.getElementById("inquiry");
const submitBtn = document.getElementById("submitBtn");
const loading = document.getElementById("loading");
const responseContainer = document.getElementById("responseContainer");
const topic = document.getElementById("topic");
const response = document.getElementById("response");

submitBtn.addEventListener("click", async () => {
    const inquiry = inquiryInput.value.trim();

    if (!inquiry) {
        alert("Please enter your inquiry.");
        return;
    }

    // Show loading state
    loading.classList.remove("hidden");
    responseContainer.classList.add("hidden");
    submitBtn.disabled = true;

    try {
        const apiResponse = await fetch("/api/inquire", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                inquiry: inquiry
            })
        });

        const data = await apiResponse.json();

        if (!apiResponse.ok) {
            throw new Error(data.message || "Something went wrong.");
        }

        topic.textContent = data.topic;
        response.textContent = data.response;

        responseContainer.classList.remove("hidden");

    } catch (error) {
        alert(error.message);
    } finally {
        loading.classList.add("hidden");
        submitBtn.disabled = false;
    }
});