/******************************************************************************
 * This file was generated by langium-cli 2.1.0.
 * DO NOT EDIT MANUALLY!
 ******************************************************************************/

import type { Grammar } from 'langium';
import { loadGrammarFromJson } from 'langium';

let loadedMidiDslGrammar: Grammar | undefined;
export const MidiDslGrammar = (): Grammar => loadedMidiDslGrammar ?? (loadedMidiDslGrammar = loadGrammarFromJson(`{
  "$type": "Grammar",
  "isDeclared": true,
  "name": "MidiDsl",
  "rules": [
    {
      "$type": "ParserRule",
      "name": "Music",
      "entry": true,
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "elements",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@9"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "pattern",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@5"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "tempo",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@8"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "timeSignature",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@7"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@12"
              },
              "arguments": []
            }
          }
        ],
        "cardinality": "+"
      },
      "definesHiddenTokens": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Note",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "note"
          },
          {
            "$type": "Assignment",
            "feature": "pitch",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@2"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "duration",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@19"
              },
              "arguments": []
            },
            "cardinality": "?"
          },
          {
            "$type": "Assignment",
            "feature": "velocity",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@22"
              },
              "arguments": []
            },
            "cardinality": "?"
          },
          {
            "$type": "Assignment",
            "feature": "repeat",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@13"
              },
              "arguments": []
            },
            "cardinality": "?"
          },
          {
            "$type": "Assignment",
            "feature": "channel",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@13"
              },
              "arguments": []
            },
            "cardinality": "?"
          },
          {
            "$type": "Assignment",
            "feature": "sequential",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@23"
              },
              "arguments": []
            },
            "cardinality": "?"
          },
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@12"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Pitch",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "noteName",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@3"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "octave",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@20"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "NoteName",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "note",
            "operator": "=",
            "terminal": {
              "$type": "Alternatives",
              "elements": [
                {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@26"
                  },
                  "arguments": []
                },
                {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@27"
                  },
                  "arguments": []
                },
                {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@28"
                  },
                  "arguments": []
                },
                {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@29"
                  },
                  "arguments": []
                },
                {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@30"
                  },
                  "arguments": []
                },
                {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@31"
                  },
                  "arguments": []
                },
                {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@32"
                  },
                  "arguments": []
                }
              ]
            }
          },
          {
            "$type": "Assignment",
            "feature": "accidental",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@25"
              },
              "arguments": []
            },
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Chord",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "chord"
          },
          {
            "$type": "Assignment",
            "feature": "notes",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@1"
              },
              "arguments": []
            },
            "cardinality": "+"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Pattern",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "pattern"
          },
          {
            "$type": "Assignment",
            "feature": "elements",
            "operator": "+=",
            "terminal": {
              "$type": "Alternatives",
              "elements": [
                {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@1"
                  },
                  "arguments": []
                },
                {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@4"
                  },
                  "arguments": []
                },
                {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@10"
                  },
                  "arguments": []
                }
              ]
            },
            "cardinality": "+"
          },
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@12"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Track",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "track"
          },
          {
            "$type": "Assignment",
            "feature": "timeSignature",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@7"
              },
              "arguments": []
            },
            "cardinality": "?"
          },
          {
            "$type": "Assignment",
            "feature": "instrument",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@13"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "Pattern",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@5"
              },
              "arguments": []
            },
            "cardinality": "*"
          },
          {
            "$type": "Assignment",
            "feature": "track",
            "operator": "+=",
            "terminal": {
              "$type": "CrossReference",
              "type": {
                "$ref": "#/rules@5"
              },
              "terminal": {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@12"
                },
                "arguments": []
              },
              "deprecatedSyntax": false
            }
          },
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@12"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "TimeSignature",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "timeSignature"
          },
          {
            "$type": "Assignment",
            "feature": "numerator",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@13"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "denominator",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@13"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Tempo",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "tempo"
          },
          {
            "$type": "Assignment",
            "feature": "tempo",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@13"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Element",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "element"
          },
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "tempo",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@8"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Assignment",
                "feature": "timeSignature",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@7"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Assignment",
                "feature": "track",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@6"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          },
          {
            "$type": "Assignment",
            "feature": "id",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@12"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Wait",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "|"
          },
          {
            "$type": "Assignment",
            "feature": "wait",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@21"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "TerminalRule",
      "hidden": true,
      "name": "WS",
      "definition": {
        "$type": "RegexToken",
        "regex": "/\\\\s+/"
      },
      "fragment": false
    },
    {
      "$type": "TerminalRule",
      "name": "ID",
      "definition": {
        "$type": "RegexToken",
        "regex": "/[_a-zA-Z][\\\\w_]*/"
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "INT",
      "type": {
        "$type": "ReturnType",
        "name": "number"
      },
      "definition": {
        "$type": "RegexToken",
        "regex": "/[0-9]+/"
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "BOOLEAN",
      "definition": {
        "$type": "TerminalAlternatives",
        "elements": [
          {
            "$type": "CharacterRange",
            "left": {
              "$type": "Keyword",
              "value": "true"
            }
          },
          {
            "$type": "CharacterRange",
            "left": {
              "$type": "Keyword",
              "value": "false"
            }
          }
        ]
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "STRING",
      "definition": {
        "$type": "RegexToken",
        "regex": "/\\"(\\\\\\\\.|[^\\"\\\\\\\\])*\\"|'(\\\\\\\\.|[^'\\\\\\\\])*'/"
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "hidden": true,
      "name": "ML_COMMENT",
      "definition": {
        "$type": "RegexToken",
        "regex": "/\\\\/\\\\*[\\\\s\\\\S]*?\\\\*\\\\//"
      },
      "fragment": false
    },
    {
      "$type": "TerminalRule",
      "hidden": true,
      "name": "SL_COMMENT",
      "definition": {
        "$type": "RegexToken",
        "regex": "/\\\\/\\\\/[^\\\\n\\\\r]*/"
      },
      "fragment": false
    },
    {
      "$type": "TerminalRule",
      "name": "NOTE",
      "definition": {
        "$type": "TerminalAlternatives",
        "elements": [
          {
            "$type": "TerminalAlternatives",
            "elements": [
              {
                "$type": "TerminalAlternatives",
                "elements": [
                  {
                    "$type": "TerminalAlternatives",
                    "elements": [
                      {
                        "$type": "TerminalAlternatives",
                        "elements": [
                          {
                            "$type": "TerminalAlternatives",
                            "elements": [
                              {
                                "$type": "TerminalRuleCall",
                                "rule": {
                                  "$ref": "#/rules@26"
                                }
                              },
                              {
                                "$type": "TerminalRuleCall",
                                "rule": {
                                  "$ref": "#/rules@27"
                                }
                              }
                            ]
                          },
                          {
                            "$type": "TerminalRuleCall",
                            "rule": {
                              "$ref": "#/rules@28"
                            }
                          }
                        ]
                      },
                      {
                        "$type": "TerminalRuleCall",
                        "rule": {
                          "$ref": "#/rules@29"
                        }
                      }
                    ]
                  },
                  {
                    "$type": "TerminalRuleCall",
                    "rule": {
                      "$ref": "#/rules@30"
                    }
                  }
                ]
              },
              {
                "$type": "TerminalRuleCall",
                "rule": {
                  "$ref": "#/rules@31"
                }
              }
            ]
          },
          {
            "$type": "TerminalRuleCall",
            "rule": {
              "$ref": "#/rules@32"
            }
          }
        ]
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "DURATION",
      "definition": {
        "$type": "TerminalAlternatives",
        "elements": [
          {
            "$type": "TerminalAlternatives",
            "elements": [
              {
                "$type": "TerminalAlternatives",
                "elements": [
                  {
                    "$type": "TerminalAlternatives",
                    "elements": [
                      {
                        "$type": "CharacterRange",
                        "left": {
                          "$type": "Keyword",
                          "value": "q"
                        }
                      },
                      {
                        "$type": "CharacterRange",
                        "left": {
                          "$type": "Keyword",
                          "value": "w"
                        }
                      }
                    ]
                  },
                  {
                    "$type": "CharacterRange",
                    "left": {
                      "$type": "Keyword",
                      "value": "h"
                    }
                  }
                ]
              },
              {
                "$type": "CharacterRange",
                "left": {
                  "$type": "Keyword",
                  "value": "e"
                }
              }
            ]
          },
          {
            "$type": "CharacterRange",
            "left": {
              "$type": "Keyword",
              "value": "s"
            }
          }
        ]
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "OCTAVE",
      "definition": {
        "$type": "RegexToken",
        "regex": "/[1-8]/"
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "WAIT",
      "definition": {
        "$type": "TerminalRuleCall",
        "rule": {
          "$ref": "#/rules@19"
        }
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "VELOCITY",
      "definition": {
        "$type": "RegexToken",
        "regex": "/[1-9][0-9]? | 100/"
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "SEQUENTIAL",
      "definition": {
        "$type": "TerminalRuleCall",
        "rule": {
          "$ref": "#/rules@14"
        }
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "TICK",
      "definition": {
        "$type": "TerminalRuleCall",
        "rule": {
          "$ref": "#/rules@13"
        }
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "ACCIDENTAL",
      "definition": {
        "$type": "TerminalAlternatives",
        "elements": [
          {
            "$type": "TerminalRuleCall",
            "rule": {
              "$ref": "#/rules@33"
            }
          },
          {
            "$type": "TerminalRuleCall",
            "rule": {
              "$ref": "#/rules@34"
            }
          }
        ]
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "A",
      "definition": {
        "$type": "TerminalAlternatives",
        "elements": [
          {
            "$type": "TerminalAlternatives",
            "elements": [
              {
                "$type": "TerminalAlternatives",
                "elements": [
                  {
                    "$type": "TerminalAlternatives",
                    "elements": [
                      {
                        "$type": "CharacterRange",
                        "left": {
                          "$type": "Keyword",
                          "value": "a"
                        }
                      },
                      {
                        "$type": "CharacterRange",
                        "left": {
                          "$type": "Keyword",
                          "value": "A"
                        }
                      }
                    ]
                  },
                  {
                    "$type": "CharacterRange",
                    "left": {
                      "$type": "Keyword",
                      "value": "do"
                    }
                  }
                ]
              },
              {
                "$type": "CharacterRange",
                "left": {
                  "$type": "Keyword",
                  "value": "DO"
                }
              }
            ]
          },
          {
            "$type": "CharacterRange",
            "left": {
              "$type": "Keyword",
              "value": "Do"
            }
          }
        ]
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "B",
      "definition": {
        "$type": "TerminalAlternatives",
        "elements": [
          {
            "$type": "TerminalAlternatives",
            "elements": [
              {
                "$type": "TerminalAlternatives",
                "elements": [
                  {
                    "$type": "TerminalAlternatives",
                    "elements": [
                      {
                        "$type": "CharacterRange",
                        "left": {
                          "$type": "Keyword",
                          "value": "b"
                        }
                      },
                      {
                        "$type": "CharacterRange",
                        "left": {
                          "$type": "Keyword",
                          "value": "B"
                        }
                      }
                    ]
                  },
                  {
                    "$type": "CharacterRange",
                    "left": {
                      "$type": "Keyword",
                      "value": "re"
                    }
                  }
                ]
              },
              {
                "$type": "CharacterRange",
                "left": {
                  "$type": "Keyword",
                  "value": "RE"
                }
              }
            ]
          },
          {
            "$type": "CharacterRange",
            "left": {
              "$type": "Keyword",
              "value": "Re"
            }
          }
        ]
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "C",
      "definition": {
        "$type": "TerminalAlternatives",
        "elements": [
          {
            "$type": "TerminalAlternatives",
            "elements": [
              {
                "$type": "TerminalAlternatives",
                "elements": [
                  {
                    "$type": "TerminalAlternatives",
                    "elements": [
                      {
                        "$type": "CharacterRange",
                        "left": {
                          "$type": "Keyword",
                          "value": "c"
                        }
                      },
                      {
                        "$type": "CharacterRange",
                        "left": {
                          "$type": "Keyword",
                          "value": "C"
                        }
                      }
                    ]
                  },
                  {
                    "$type": "CharacterRange",
                    "left": {
                      "$type": "Keyword",
                      "value": "mi"
                    }
                  }
                ]
              },
              {
                "$type": "CharacterRange",
                "left": {
                  "$type": "Keyword",
                  "value": "MI"
                }
              }
            ]
          },
          {
            "$type": "CharacterRange",
            "left": {
              "$type": "Keyword",
              "value": "Mi"
            }
          }
        ]
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "D",
      "definition": {
        "$type": "TerminalAlternatives",
        "elements": [
          {
            "$type": "TerminalAlternatives",
            "elements": [
              {
                "$type": "TerminalAlternatives",
                "elements": [
                  {
                    "$type": "TerminalAlternatives",
                    "elements": [
                      {
                        "$type": "CharacterRange",
                        "left": {
                          "$type": "Keyword",
                          "value": "d"
                        }
                      },
                      {
                        "$type": "CharacterRange",
                        "left": {
                          "$type": "Keyword",
                          "value": "D"
                        }
                      }
                    ]
                  },
                  {
                    "$type": "CharacterRange",
                    "left": {
                      "$type": "Keyword",
                      "value": "fa"
                    }
                  }
                ]
              },
              {
                "$type": "CharacterRange",
                "left": {
                  "$type": "Keyword",
                  "value": "FA"
                }
              }
            ]
          },
          {
            "$type": "CharacterRange",
            "left": {
              "$type": "Keyword",
              "value": "Fa"
            }
          }
        ]
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "E",
      "definition": {
        "$type": "TerminalAlternatives",
        "elements": [
          {
            "$type": "TerminalAlternatives",
            "elements": [
              {
                "$type": "TerminalAlternatives",
                "elements": [
                  {
                    "$type": "TerminalAlternatives",
                    "elements": [
                      {
                        "$type": "CharacterRange",
                        "left": {
                          "$type": "Keyword",
                          "value": "e"
                        }
                      },
                      {
                        "$type": "CharacterRange",
                        "left": {
                          "$type": "Keyword",
                          "value": "E"
                        }
                      }
                    ]
                  },
                  {
                    "$type": "CharacterRange",
                    "left": {
                      "$type": "Keyword",
                      "value": "sol"
                    }
                  }
                ]
              },
              {
                "$type": "CharacterRange",
                "left": {
                  "$type": "Keyword",
                  "value": "SOL"
                }
              }
            ]
          },
          {
            "$type": "CharacterRange",
            "left": {
              "$type": "Keyword",
              "value": "Sol"
            }
          }
        ]
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "F",
      "definition": {
        "$type": "TerminalAlternatives",
        "elements": [
          {
            "$type": "TerminalAlternatives",
            "elements": [
              {
                "$type": "TerminalAlternatives",
                "elements": [
                  {
                    "$type": "TerminalAlternatives",
                    "elements": [
                      {
                        "$type": "CharacterRange",
                        "left": {
                          "$type": "Keyword",
                          "value": "f"
                        }
                      },
                      {
                        "$type": "CharacterRange",
                        "left": {
                          "$type": "Keyword",
                          "value": "F"
                        }
                      }
                    ]
                  },
                  {
                    "$type": "CharacterRange",
                    "left": {
                      "$type": "Keyword",
                      "value": "la"
                    }
                  }
                ]
              },
              {
                "$type": "CharacterRange",
                "left": {
                  "$type": "Keyword",
                  "value": "LA"
                }
              }
            ]
          },
          {
            "$type": "CharacterRange",
            "left": {
              "$type": "Keyword",
              "value": "La"
            }
          }
        ]
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "G",
      "definition": {
        "$type": "TerminalAlternatives",
        "elements": [
          {
            "$type": "TerminalAlternatives",
            "elements": [
              {
                "$type": "TerminalAlternatives",
                "elements": [
                  {
                    "$type": "TerminalAlternatives",
                    "elements": [
                      {
                        "$type": "CharacterRange",
                        "left": {
                          "$type": "Keyword",
                          "value": "g"
                        }
                      },
                      {
                        "$type": "CharacterRange",
                        "left": {
                          "$type": "Keyword",
                          "value": "G"
                        }
                      }
                    ]
                  },
                  {
                    "$type": "CharacterRange",
                    "left": {
                      "$type": "Keyword",
                      "value": "si"
                    }
                  }
                ]
              },
              {
                "$type": "CharacterRange",
                "left": {
                  "$type": "Keyword",
                  "value": "SI"
                }
              }
            ]
          },
          {
            "$type": "CharacterRange",
            "left": {
              "$type": "Keyword",
              "value": "Si"
            }
          }
        ]
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "SHARP",
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": "#"
        }
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "FLAT",
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": "b"
        }
      },
      "fragment": false,
      "hidden": false
    }
  ],
  "definesHiddenTokens": false,
  "hiddenTokens": [],
  "imports": [],
  "interfaces": [],
  "types": [],
  "usedGrammars": []
}`));
