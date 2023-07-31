const certs = document.querySelectorAll('.audit-certs__item');

if (certs.length)
    certs.forEach(cert => {

        const descr = cert.querySelector('p')
        const img = cert.querySelector('img')

        img.addEventListener('click', function () {
            certs.forEach(item => {
                item.classList.remove('_active')
            })

            img.closest('.audit-certs__item').classList.add('_active')
        })

        descr.addEventListener('click', function () {
            descr.closest('.audit-certs__item').classList.remove('_active')
        })
    })