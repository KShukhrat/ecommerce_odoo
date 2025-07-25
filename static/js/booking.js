odoo.define('your_module.booking', function (require) {
    "use strict";

    var ajax = require('web.ajax');

    $(document).ready(function () {
        function loadTimeSlots() {
            var doctorId = $('#doctor_id').val();
            var appointmentDate = $('#date').val();

            var $timeSelect = $('#time_start');

            if (doctorId && appointmentDate) {
                $timeSelect.prop('disabled', true);
                ajax.jsonRpc('/get_available_times', 'call', {
                    doctor_id: doctorId,
                    date: appointmentDate
                }).then(function (times) {
                    $timeSelect.empty();
                    if (times.length) {
                        $timeSelect.append('<option value="">Выберите время</option>');
                        times.forEach(function (time) {
                            $timeSelect.append('<option value="' + time + '">' + time + '</option>');
                        });
                        $timeSelect.prop('disabled', false);
                    } else {
                        $timeSelect.append('<option value="">Нет доступного времени</option>');
                    }
                }).guardedCatch(function () {
                    $timeSelect.empty().append('<option value="">Ошибка загрузки времени</option>');
                });
            } else {
                $timeSelect.empty().append('<option value="">-- Сначала выберите врача и дату --</option>').prop('disabled', true);
            }
        }

        $('#doctor_id, #date').on('change', loadTimeSlots);
    });
});
