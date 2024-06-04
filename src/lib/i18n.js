import { createI18n } from 'vue-i18n'

const messages = {
    en: {
        calendar: {
            headerLabelFormat: 'MMMM YYYY',
            weekdays: {
                sunday: 'S',
                monday: 'M',
                tuesday: 'T',
                wednesday: 'W',
                thursday: 'T',
                friday: 'F',
                saturday: 'S',
            },
            weekdaysSmallLetters: {
                sunday: 'un',
                monday: 'on',
                tuesday: 'ue',
                wednesday: 'ed',
                thursday: 'hu',
                friday: 'ri',
                saturday: 'at',
            },
            settings: {
                label: 'Settings',
                description: 'You can set your holidays. Save the holidays data in CSV format, then holidays will be filled in red circle. Acceptable CSV format is <span class= "bg-gray-100 text-red-400 rounded-md p-1 text-sm font-mono">YYYY/MM/DD,Holiday name</span>. Holidays data is stored in your browser\'s local storage. Your data is not sent to the server.',
                inputLabel: 'Holiday Data',
                placeholder: 'YYYY/MM/DD,Holiday name',
                saveButtonLabel: 'Save',
                presetDescription: 'We offer some holidays presets. Click below links to add holidays data and then save the data.',
                errorMessage: '"{msg}" is wrong format',
            },
            selectedRange: {
                day: 'no days | one day | {count} days',
                businessDay: 'no business days | one business day | {count} business days',
                close: 'Close',
            },
            controls: {
                now: 'Now',
                prev: 'Prev',
                next: 'Next',
                showOneMonth: 'Show one month',
                showTwoMonth: 'Show two months',
            },
            datePicker: {
                doneButton: 'Done'
            }
        },
        timezoneTable: {
            addButton: 'Add',
            editButton: 'Edit',
            doneButton: 'Done',
            notice: 'Timezones on this site are based on <a href="https://en.wikipedia.org/wiki/List_of_time_zone_abbreviations" class="text-indigo-500" target="_blank" rel="noopener noreferrer">Wikipedia</a>. As timezones may change, we cannot guarantee that our information is free of errors.'
        },
        timezoneConverter: {
            date: 'Date',
            calendarButton: 'Pick a date',
            from: 'From',
            to: 'To',
            options: 'Options',
            abbreviatedTimezoneName: 'Abbreviated Timezone Name',
            UTCOffset: 'UTC Offset',
            convertButton: 'Convert',
            results: 'Results',
            resultsCaption1: 'You can copy converted results by clicking ',
            resultsCaption2: ' buttons.',
            format: 'Format',
            notice: 'Timezones on this site are based on <a href="https://en.wikipedia.org/wiki/List_of_time_zone_abbreviations" class="text-indigo-500" target="_blank" rel="noopener noreferrer">Wikipedia</a>. As timezones may change, we cannot guarantee that our information is free of errors.',
            error: {
                dateIsEmpty: 'Input date',
                dateIsInvalidFormat: 'Date format is invalid',
                timezoneIsEmpty: 'Select a timezone',
            }
        },
        multiselect: {
            placeholder: 'Select a timezone',
            selectLabel: 'Press enter to select',
            selectedLabel: 'Selected',
            noResult: 'No timezones found'
        }
    },
    ja: {
        calendar: {
            headerLabelFormat: 'YYYY年M月',
            weekdays: {
                sunday: '日',
                monday: '月',
                tuesday: '火',
                wednesday: '水',
                thursday: '木',
                friday: '金',
                saturday: '土',
            },
            weekdaysSmallLetters: {
                sunday: '',
                monday: '',
                tuesday: '',
                wednesday: '',
                thursday: '',
                friday: '',
                saturday: '',
            },
            settings: {
                label: '設定',
                description: 'あなたの祝日を設定できます。CSVフォーマットで祝日のデータを保存すると祝日が赤い丸で表示されます。CSVのフォーマットは、<span class="bg-gray-100 text-red-400 rounded-md p-1 text-sm font-mono">YYYY/MM/DD,祝日名</span>です。祝日のデータはブラウザのローカルストレージに保存されます。祝日のデータはサーバには送信されません。',
                inputLabel: '祝日のデータ',
                placeholder: 'YYYY/MM/DD,祝日名',
                saveButtonLabel: '保存',
                presetDescription: '便利な祝日のプリセットがあります。以下のリンクをクリックすると祝日のデータに追記されます。その後、保存ボタンをクリックします。',
                errorMessage: '"{msg}" はフォーマットが正しくありません。',
            },
            selectedRange: {
                day: '{count}日',
                businessDay: '{count}営業日',
                close: '閉じる',
            },
            controls: {
                now: 'Now',
                prev: '前月',
                next: '翌月',
                showOneMonth: '1ヶ月表示',
                showTwoMonths: '2ヶ月表示',
            },
            datePicker: {
                doneButton: '設定'
            }
        },
        timezoneTable: {
            addButton: '追加',
            editButton: '編集',
            doneButton: '完了',
            notice: 'タイムゾーンは<a href="https://en.wikipedia.org/wiki/List_of_time_zone_abbreviations" class="text-indigo-500" target="_blank" rel="noopener noreferrer">ウィキペディア</a>を参考にしています。タイムゾーンは変更されるの可能性があり、情報が正確である保証はありません。'
        },
        timezoneConverter: {
            date: '日付',
            calendarButton: '日時を選択',
            from: '変換元',
            to: '変換先',
            options: 'オプション',
            abbreviatedTimezoneName: 'タイムゾーンの略称を表示',
            UTCOffset: 'UTCオフセットを表示',
            convertButton: '変換',
            results: '変換結果',
            resultsCaption1: '変換結果は ',
            resultsCaption2: ' ボタンをクリックするとコピーできます。',
            format: 'フォーマット',
            notice: 'タイムゾーンは<a href="https://en.wikipedia.org/wiki/List_of_time_zone_abbreviations" class="text-indigo-500" target="_blank" rel="noopener noreferrer">ウィキペディア</a>を参考にしています。タイムゾーンは変更されるの可能性があり、情報が正確である保証はありません。',
            error: {
                dateIsEmpty: '日付を入力してください',
                dateIsInvalidFormat: '日付のフォーマットが正しくありません',
                timezoneIsEmpty: 'タイムゾーンを選択してください',
            }
        },
        multiselect: {
            placeholder: 'タイムゾーンを選択',
            selectLabel: 'Enterキーを押して決定',
            selectedLabel: '選択済み',
            noResult: 'タイムゾーンが見つかりません'
        }
    }
}

/**
 * Get i18n instance
 * @param {string} locale - en or ja
 * @returns 
 */
export const getI18n = (locale = 'en') => {
    return createI18n({
        locale: locale,
        fallbackLocale: 'en',
        messages,
        legacy: false
    })
}
