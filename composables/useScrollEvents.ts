export default () => {
    let scrollTop = ref(0)

    const scrollCallback = () => {
        const st = window.pageYOffset || document.documentElement.scrollTop
        if (st > scrollTop.value || st < scrollTop.value) {
            // vertical scroll
            scrollTop.value = st <= 0 ? 0 : st // For Mobile or negative scrolling
        }
    }

    onMounted(() => {
        // setting event when the document exist
        scrollTop.value = document.documentElement.scrollTop
        window.addEventListener("scroll", scrollCallback)
    })

    onBeforeUnmount(() => {
        // removing event when the document exist and component is before unmount
        window.removeEventListener("scroll", scrollCallback)
    })

    return {
        scrollTop
    }
}