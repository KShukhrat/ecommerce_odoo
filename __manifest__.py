{
    'name': 'Модуль Санатория "Здоровье"',
    'version': '1.0',
    'summary': 'Лечение в Здоровье',
    'category': 'Administration',
    'author': 'Rakhimova Makhliyo',
    'website': 'google.com',
    'license': 'LGPL-3',
    'icon': 'sanatorium_profilactorium/static/images/icons/icon_zdirovie.png',
    'depends': [
        'base', 'mail', 'calendar', 'website',
        'muk_web_theme', 'contacts'
    ],
    'data': [
        #menu
        'views/backoffice/menuitem.xml',

        #views
        'views/backoffice/patient_views.xml',
        'views/backoffice/student_views.xml',
        'views/backoffice/treatment_views.xml',
        'views/backoffice/doctor_views.xml',
        'views/backoffice/treatment_session_views.xml',

        #reports
        'views/reports/treatment_session_report.xml',

        #data
        'data/email_template.xml',
        'data/company_data.xml',

        #web_site_tempalates
        'views/templates/booking.xml',
        'views/templates/error-pages.xml',
        'views/templates/templates.xml',

        # security
        'security/ir.model.access.csv',
    ],
    'assets': {
        'web.assets_frontend': [
            'sanatorium_profilactorium/static/js/*.js',
            'sanatorium_profilactorium/static/css/*.css',
            'sanatorium_profilactorium/static/images/*',
            'sanatorium_profilactorium/static/images/icons/*',
        ],'web.assets_backend': [
            'sanatorium_profilactorium/static/src/js/*.js',
            'sanatorium_profilactorium/static/src/css/*.css',
            'sanatorium_profilactorium/static/src/xml/*.xml',
        ],
    },
    'installable': True,
    'auto_install': False,
}
