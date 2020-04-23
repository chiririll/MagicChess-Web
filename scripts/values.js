const ltrs = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ]; const defConf = {
  White: {
    Pawn: [ /*"A2",*/ "B2", "C2", "D2", "E2", "F2", "G2", "H2" ],
    Rook: [ "A1", "H1" ],
    Knight: [ /*"B1",*/ "G1" ],
    Bishop: [ "C1", "F1" ],
    King: [ "D1" ],
    Queen: [ "E1" ]
  },
  Black: {
    Pawn: [ "A7", "B7", "C7", "D7", "E7", "F7", "G7", /*,"H7"*/ ],
    Rook: [ "A8", "H8" ],
    Knight: [ "B8", "G8" ],
    Bishop: [ "C8", "F8" ],
    King: [ "D8" ],
    Queen: [ "E8" ]
  }
} 