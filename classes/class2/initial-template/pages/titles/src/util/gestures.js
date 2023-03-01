const { GestureDescription, Finger, FingerCurl, FingerDirection } = window.fp;
  
const ScrollDownGesture = new GestureDescription('scroll-down'); // ✊️
const ScrollUpGesture = new GestureDescription('scroll-up'); // 🖐
const ScissorsGesture = new GestureDescription('scissors'); // ✌️
const RockAndRollGesture = new GestureDescription('rock-and-roll'); //🤘
const FingerYouGesture = new GestureDescription('finger-you') //🖕
const ItalianHandGesture = new GestureDescription('italian-hand') //🤌


  
// Rock
// -----------------------------------------------------------------------------
  
// thumb: half curled
// accept no curl with a bit lower confidence
ScrollDownGesture.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
ScrollDownGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 0.5);

// all other fingers: curled
for(let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
    ScrollDownGesture.addCurl(finger, FingerCurl.FullCurl, 1.0);
    ScrollDownGesture.addCurl(finger, FingerCurl.HalfCurl, 0.9);
}


// Paper
// -----------------------------------------------------------------------------
  
// no finger should be curled
for(let finger of Finger.all) {
    ScrollUpGesture.addCurl(finger, FingerCurl.NoCurl, 1.0);
}


// Scissors
//------------------------------------------------------------------------------
  
// index and middle finger: stretched out
ScissorsGesture.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
ScissorsGesture.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
  
// ring: curled
ScissorsGesture.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
ScissorsGesture.addCurl(Finger.Ring, FingerCurl.HalfCurl, 0.9);

// pinky: curled
ScissorsGesture.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
ScissorsGesture.addCurl(Finger.Pinky, FingerCurl.HalfCurl, 0.9);

// Rock and Roll
//------------------------------------------------------------------------------
RockAndRollGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0)


RockAndRollGesture.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0)

RockAndRollGesture.addCurl(Finger.Middle, FingerCurl.FullCurl, 1.0)
RockAndRollGesture.addCurl(Finger.Middle, FingerCurl.HalfCurl, 0.9)

RockAndRollGesture.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0)
RockAndRollGesture.addCurl(Finger.Ring, FingerCurl.HalfCurl, 0.9)

RockAndRollGesture.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0)



// Finger You
//------------------------------------------------------------------------------
FingerYouGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0)

FingerYouGesture.addCurl(Finger.Index, FingerCurl.FullCurl, 1.0)
FingerYouGesture.addCurl(Finger.Index, FingerCurl.HalfCurl, 0.9)

FingerYouGesture.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0)

FingerYouGesture.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0)
FingerYouGesture.addCurl(Finger.Ring, FingerCurl.HalfCurl, 0.9)

FingerYouGesture.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0)
FingerYouGesture.addCurl(Finger.Pinky, FingerCurl.HalfCurl, 0.9)



// Italian Hand
//------------------------------------------------------------------------------
ItalianHandGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0)
ItalianHandGesture.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0)

ItalianHandGesture.addCurl(Finger.Index, FingerCurl.HalfCurl, 1.0)
ItalianHandGesture.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 1.0)

ItalianHandGesture.addCurl(Finger.Middle, FingerCurl.HalfCurl, 1.0)
ItalianHandGesture.addDirection(Finger.Middle, FingerDirection.DiagonalUpLeft, 1.0)

ItalianHandGesture.addCurl(Finger.Ring, FingerCurl.HalfCurl, 1.0)
ItalianHandGesture.addDirection(Finger.Ring, FingerDirection.DiagonalUpLeft, 1.0)

ItalianHandGesture.addCurl(Finger.Pinky, FingerCurl.HalfCurl, 1.0)
ItalianHandGesture.addDirection(Finger.Pinky, FingerDirection.DiagonalUpLeft, 1.0)


const knownGestures = [
    ScrollDownGesture,
    ScrollUpGesture,
    RockAndRollGesture,
    FingerYouGesture,
    ItalianHandGesture
    
]

const gesturesStrings = {
    'scroll-up': '🖐',
    'scroll-down': '✊️',
    'rock-and-roll': '🤘',
    'finger-you': '🖕',
    'italian-hand': '🤌',
}

export{
    knownGestures,
    gesturesStrings
} 