# Hostile fixtures

All samples in this folder are fictional test data. Read them as plain text or
JSON inputs.

| File | Input |
| --- | --- |
| prompt-injection.txt | Instruction-shaped text requesting a fictional marker |
| oversized.txt | ASCII text beyond a synthetic 4,096-character boundary |
| mixed-scripts.txt | Latin and Cyrillic letters with U+200B and U+200D |
| path-traversal-names.json | Filename strings using forward and back slashes |
| html-and-script.txt | Literal HTML with a comment inside the script tag |
| malformed.csv | A record with one more column than the header |
