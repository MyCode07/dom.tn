const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            observer.unobserve(entry.target)
        }
    })
})

const images = document.querySelectorAll('img.lazy');
if (images.length) {
    images.forEach(img => {
        observer.observe(img)
    })
}