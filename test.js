

function generateJSONLD(e, a) {
	const i = a[e];
	if (!i) return "";
	const t = {
		"@context": "http://schema.org",
		"@type": "Product",
		name: e,
		aggregateRating: {
			"@type": "AggregateRating",
			ratingValue: i.averageRating,
			reviewCount: i.reviews.length
		},
		review: i.reviews.map(((e, a) => ({
			"@type": "Review",
			author: {
				"@type": "Person",
				name: e.name
			},
			reviewRating: {
				"@type": "Rating",
				ratingValue: e.rating
			},
			reviewBody: e.comment,
			image: e.image
		})))
	};
	return JSON.stringify(t)
}

function loadProductReviews(e, a = 4) {
	const i = productData[e],
		t = document.getElementById("review-list"),
		n = document.getElementById("trusted-reviews"),
		o = document.getElementById("average-rating");
	if (t.innerHTML = "", !i) {
		const e = document.createElement("p");
		return e.classList.add("no-reviews-message"), e.textContent = "No reviews yet for this product.", t.appendChild(e), n && (n.style.display = "none"), void(o && (o.style.display = "none"))
	}
	const s = document.createElement("script");
	s.type = "application/ld+json", s.textContent = generateJSONLD(e, productData), document.head.appendChild(s), document.getElementById("product-name").textContent = e, document.getElementById("average-rating-value").textContent = i.averageRating;
	if (i.reviews.slice(0, a).forEach((e => {
			const a = document.createElement("div");
			a.classList.add("user-review-box");
			const i = Array.from({
					length: e.rating
				}, (() => '<i class="fas fa-star" style="color: #e49e21;"></i>')).join(""),
				n = e.image ? `<img src="${e.image}" alt="${e.name}'s review image" class="review-image">` : "";
			a.innerHTML = `\n        <p><i style="color:cornflowerblue; margin-right:4px;" class="fa fa-check-circle"></i><strong>${e.name}</strong></p>\n        <p>Rating: ${i}</p>\n        <p>${e.comment}</p>\n        ${n}\n      `, t.appendChild(a)
		})), i.reviews.length > a) {
		const e = document.createElement("div");
		e.textContent = "See All", e.classList.add("see-all-div"), e.style.cursor = "pointer", e.addEventListener("click", (() => {
			t.innerHTML = "", i.reviews.forEach((e => {
				const a = document.createElement("div");
				a.classList.add("user-review-box");
				const i = Array.from({
						length: e.rating
					}, (() => '<i class="fas fa-star" style="color: #e49e21;"></i>')).join(""),
					n = e.image ? `<img src="${e.image}" alt="review image's review image" class="review-image">` : "";
				a.innerHTML = `\n            <p><i style="color:cornflowerblue; margin-right:4px;" class="fa fa-check-circle"></i><strong>${e.name}</strong></p>\n            <p>Rating: ${i}</p>\n            <p>${e.comment}</p>\n            ${n}\n          `, t.appendChild(a)
			}))
		})), t.appendChild(e)
	}
	console.log("Product reviews loaded successfully (HTML and JSON-LD).")
}
const initialProductName = document.getElementById("product-name").textContent;
loadProductReviews(initialProductName, 4);