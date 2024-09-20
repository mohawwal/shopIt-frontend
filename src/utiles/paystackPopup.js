export const payWithPaystack = (access_code) => {
    const popup = new window.PaystackPop()
    popup.resumeTransaction(access_code)
}
