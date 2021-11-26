export default class Validation {
    // kiểm tra rỗng
    checkEmpty(value, message) {
        if (value.trim() != "") {
            return true;
        }
        alert(message)
        return false;
    }
}