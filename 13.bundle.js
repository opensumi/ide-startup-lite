(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{1300:function(e){e.exports=JSON.parse('{"fileTypes":[],"hideFromUser":true,"name":"Regular Expressions (JavaScript)","patterns":[{"include":"#regexp"}],"repository":{"regex-character-class":{"patterns":[{"match":"\\\\\\\\[wWsSdD]|\\\\.","name":"constant.character.character-class.regexp"},{"match":"\\\\\\\\([0-7]{3}|x\\\\h\\\\h|u\\\\h\\\\h\\\\h\\\\h)","name":"constant.character.numeric.regexp"},{"match":"\\\\\\\\c[A-Z]","name":"constant.character.control.regexp"},{"match":"\\\\\\\\.","name":"constant.character.escape.backslash.regexp"}]},"regexp":{"patterns":[{"match":"\\\\\\\\[bB]|\\\\^|\\\\$","name":"keyword.control.anchor.regexp"},{"match":"\\\\\\\\[1-9]\\\\d*","name":"keyword.other.back-reference.regexp"},{"match":"[?+*]|\\\\{(\\\\d+,\\\\d+|\\\\d+,|,\\\\d+|\\\\d+)\\\\}\\\\??","name":"keyword.operator.quantifier.regexp"},{"match":"\\\\|","name":"keyword.operator.or.regexp"},{"begin":"(\\\\()((\\\\?=)|(\\\\?!))","beginCaptures":{"1":{"name":"punctuation.definition.group.regexp"},"3":{"name":"meta.assertion.look-ahead.regexp"},"4":{"name":"meta.assertion.negative-look-ahead.regexp"}},"end":"(\\\\))","endCaptures":{"1":{"name":"punctuation.definition.group.regexp"}},"name":"meta.group.assertion.regexp","patterns":[{"include":"#regexp"}]},{"begin":"\\\\((\\\\?:)?","beginCaptures":{"0":{"name":"punctuation.definition.group.regexp"}},"end":"\\\\)","endCaptures":{"0":{"name":"punctuation.definition.group.regexp"}},"name":"meta.group.regexp","patterns":[{"include":"#regexp"}]},{"begin":"(\\\\[)(\\\\^)?","beginCaptures":{"1":{"name":"punctuation.definition.character-class.regexp"},"2":{"name":"keyword.operator.negation.regexp"}},"end":"(\\\\])","endCaptures":{"1":{"name":"punctuation.definition.character-class.regexp"}},"name":"constant.other.character-class.set.regexp","patterns":[{"captures":{"1":{"name":"constant.character.numeric.regexp"},"2":{"name":"constant.character.control.regexp"},"3":{"name":"constant.character.escape.backslash.regexp"},"4":{"name":"constant.character.numeric.regexp"},"5":{"name":"constant.character.control.regexp"},"6":{"name":"constant.character.escape.backslash.regexp"}},"match":"(?:.|(\\\\\\\\(?:[0-7]{3}|x\\\\h\\\\h|u\\\\h\\\\h\\\\h\\\\h))|(\\\\\\\\c[A-Z])|(\\\\\\\\.))\\\\-(?:[^\\\\]\\\\\\\\]|(\\\\\\\\(?:[0-7]{3}|x\\\\h\\\\h|u\\\\h\\\\h\\\\h\\\\h))|(\\\\\\\\c[A-Z])|(\\\\\\\\.))","name":"constant.other.character-class.range.regexp"},{"include":"#regex-character-class"}]},{"include":"#regex-character-class"}]}},"scopeName":"source.js.regexp","uuid":"AC8679DE-3AC7-4056-84F9-69A7ADC29DDD"}')}}]);