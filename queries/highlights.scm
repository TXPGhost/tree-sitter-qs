[
  "let"
  "if"
  "else"
  "while"
  "return"
  "break"
  "continue"
] @keyword

[
  "+"
  "-"
  "*"
  "/"
  "=="
  "!="
  ">="
  "<="
] @operator

[
  ";"
  ","
  "("
  ")"
  "["
  "]"
  "{"
  "}"
] @punctuation

(ident) @variable
(number) @number
(string) @string
(char) @character
