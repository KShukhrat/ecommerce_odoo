/** @odoo-module **/

import { registry } from "@web/core/registry";
import { CharField } from "@web/views/fields/char/char_field";
import { useRef, onMounted } from "@odoo/owl";

class PhoneField extends CharField {
    static template = "sanatorium_profilactorium.PhoneField";

    setup() {
        super.setup();
        this.inputRef = useRef("input");

        onMounted(() => {
            if (!this.inputRef.el) return;
            const input = this.inputRef.el;

            // Initialize with empty value (don't show underscores)
            input.value = this._formatPhone(this.props.value || "");
            input.setAttribute("maxlength", "18");

            input.addEventListener("input", (e) => this._onInput(e));
            input.addEventListener("keydown", (e) => this._onKeyDown(e));
            input.addEventListener("blur", (e) => this._onBlur(e));
        });
    }

    _onInput(event) {
        const input = event.target;
        const cursorPos = input.selectionStart;
        let rawValue = input.value.replace(/\D/g, '');

        // Limit to 11 digits (7 + 10 digits)
        if (rawValue.length > 11) {
            rawValue = rawValue.slice(0, 11);
        }

        const formatted = this._formatPhone(rawValue);
        input.value = formatted;

        // Calculate new cursor position
        let newCursorPos = cursorPos;
        if (cursorPos <= 4 && rawValue.length === 0) {
            // Force cursor after "+7 ("
            newCursorPos = 4;
        }
        input.setSelectionRange(newCursorPos, newCursorPos);

        this.props.record.update({ [this.props.name]: rawValue });
    }

    _onKeyDown(event) {
        const input = event.target;
        const cursorPos = input.selectionStart;

        // Allowed keys: navigation, control keys, etc.
        const allowedKeys = [8, 9, 13, 16, 17, 18, 20, 27, 35, 36, 37, 38, 39, 40, 45, 46];
        const ctrlCombinations = [65, 67, 86, 88];

        if (allowedKeys.includes(event.keyCode) ||
            (event.ctrlKey && ctrlCombinations.includes(event.keyCode))) {
            return;
        }

        // Only allow numbers
        if ((event.keyCode < 48 || event.keyCode > 57) &&
            (event.keyCode < 96 || event.keyCode > 105)) {
            event.preventDefault();
        }

        // Prevent typing before "+7 ("
        if (cursorPos < 4) {
            event.preventDefault();
        }
    }

    _onBlur(event) {
        const input = event.target;
        input.value = this._formatPhone(input.value);

        // Update record only when phone number is correctly formatted
        let rawValue = input.value.replace(/\D/g, '');
        if (rawValue.length === 11) {
            this.props.record.update({ [this.props.name]: rawValue });
        }
    }

    _formatPhone(value) {
        const digits = value.replace(/\D/g, '');
        if (!digits) return "+7 ("; // Start with just the prefix

        let formatted = "+7 (";
        if (digits.length > 1) formatted += digits.slice(1, 4);
        formatted += ") ";
        if (digits.length > 4) formatted += digits.slice(4, 7);
        formatted += "-";
        if (digits.length > 7) formatted += digits.slice(7, 9);
        formatted += "-";
        if (digits.length > 9) formatted += digits.slice(9, 11);

        return formatted;
    }
}

registry.category("fields").add("phone_mask", {
    component: PhoneField,
    supportedTypes: ["char"],
});
