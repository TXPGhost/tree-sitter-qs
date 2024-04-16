module.exports = grammar({
  name: "QS",
  rules: {
    source_file: ($) => $.block,
    block: ($) =>
      seq(
        repeat(seq($.stmt, ";")),
        choice($.expr, seq($.stmt, ";")),
      ),

    ident: ($) => /[a-zA-Z_][a-zA-Z0-9_]*/,
    number: ($) => /\d+/,
    string: ($) => /\"(\\.|[^"\\])*\"/,
    char: ($) => /\'(\\.|[^'\\])*\'/,

    pat: ($) => choice("_", $.ident, $.pat_tuple, $.pat_array),
    pat_tuple: ($) =>
      seq(
        "(",
        repeat1(seq($.pat, ",")),
        $.pat,
        ")",
      ),
    pat_array: ($) =>
      seq(
        "[",
        repeat(seq($.pat, ",")),
        $.pat,
        "]",
      ),

    stmt: ($) =>
      choice(
        $.let,
        $.return,
        $.break,
        $.continue,
        $.set_eq,
        $.add_eq,
        $.sub_eq,
        $.mul_eq,
        $.div_eq,
      ),
    let: ($) =>
      seq(
        "let",
        field("pat", $.pat),
        "=",
        field("expr", $.expr),
      ),
    return: ($) =>
      seq(
        "return",
        field("expr", $.expr),
      ),
    break: ($) =>
      seq(
        "break",
        field("expr", $.expr),
      ),
    continue: ($) => field("continue", "continue"),
    set_eq: ($) =>
      seq(
        field("pat", $.pat),
        ":=",
        field("expr", $.expr),
      ),
    add_eq: ($) =>
      seq(
        field("pat", $.pat),
        "+=",
        field("expr", $.expr),
      ),
    sub_eq: ($) =>
      seq(
        field("pat", $.pat),
        "-=",
        field("expr", $.expr),
      ),
    mul_eq: ($) =>
      seq(
        field("pat", $.pat),
        "*=",
        field("expr", $.expr),
      ),
    div_eq: ($) =>
      seq(
        field("pat", $.pat),
        "/=",
        field("expr", $.expr),
      ),

    expr: ($) =>
      choice(
        $.ident,
        $.number,
        $.string,
        $.char,
        $.call,
        $.tuple,
        $.if,
        $.if_else,
        $.while,
        seq("{", $.block, "}"),
        $.unary_op,
        $.binary_op,
      ),
    if: ($) =>
      prec(
        1,
        seq(
          "if",
          "(",
          field("cond", $.expr),
          ")",
          field("body", $.expr),
        ),
      ),
    if_else: ($) =>
      prec(
        2,
        seq(
          "if",
          "(",
          field("cond", $.expr),
          ")",
          field("body_if", $.expr),
          "else",
          field("body_else", $.expr),
        ),
      ),
    while: ($) =>
      prec(
        1,
        seq(
          "while",
          "(",
          field("cond", $.expr),
          ")",
          field("body", $.expr),
        ),
      ),

    call: ($) => seq(field("func", $.ident), "(", field("args", $.expr), ")"),
    tuple: ($) =>
      prec.left(
        7,
        seq(
          repeat1(seq($.expr, ",")),
          $.expr,
        ),
      ),

    unary_op: ($) => choice($.neg, $.not),
    neg: ($) => prec(6, seq("-", $.expr)),
    not: ($) => prec(6, seq("!", $.expr)),

    binary_op: ($) =>
      choice(
        $.add,
        $.sub,
        $.mul,
        $.div,
        $.eq,
        $.ne,
        $.ge,
        $.le,
      ),
    add: ($) =>
      prec.left(4, seq(field("lhs", $.expr), "+", field("rhs", $.expr))),
    sub: ($) =>
      prec.left(4, seq(field("lhs", $.expr), "-", field("rhs", $.expr))),
    mul: ($) =>
      prec.left(5, seq(field("lhs", $.expr), "*", field("rhs", $.expr))),
    div: ($) =>
      prec.left(5, seq(field("lhs", $.expr), "/", field("rhs", $.expr))),
    eq: ($) =>
      prec.left(3, seq(field("lhs", $.expr), "==", field("rhs", $.expr))),
    ne: ($) =>
      prec.left(3, seq(field("lhs", $.expr), "!=", field("rhs", $.expr))),
    ge: ($) =>
      prec.left(3, seq(field("lhs", $.expr), ">=", field("rhs", $.expr))),
    le: ($) =>
      prec.left(3, seq(field("lhs", $.expr), "<=", field("rhs", $.expr))),
  },
});
