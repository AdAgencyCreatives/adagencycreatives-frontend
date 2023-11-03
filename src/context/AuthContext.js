import Cookies from "js-cookie";
import { api, setAuthToken } from "../api/api";
import createDataContext from "./createDataContext";

const state = {
  isSignedIn: false,
  formMessage: null,
  token: null,
  role: null,
  user: null,
  formSubmit: false,
  messageAlert: { type: '', message: '', display: '' },
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "set_token":
      return {
        ...state,
        token: action.payload.token,
        role: action.payload.role,
      };

    case "set_form_message":
      return { ...state, formMessage: action.payload };
    case "set_user":
      return { ...state, user: action.payload };

    case "reset_form_message":
      return { ...state, formMessage: null };
    case "set_form_submit":
      return { ...state, formSubmit: action.payload };

      case "show_message_alert":
        return { ...state, messageAlert: action.payload };

    default:
      return state;
  }
};

const resetFormMessage = (dispatch) => {
  return () => {
    dispatch({
      type: "reset_form_message",
    });
  };
};

const getRegisterSuccessMessage = () => {
  return (
    <>
      Hello,
      <br />
      <br />
      Thank you for successfully registering. You'll receive an email with next
      steps.
      <br />
      <br />
      It could be a few business days for us to verify your registration
      request. Be on the look out for our email.
      <br />
      <br />
      In the meantime, enjoy exploring our home page.
      <br />
      <br />- Ad Agency Creatives
    </>
  );
};

const getLoginSuccessMessage = () => {
  return "Login Successful";
};

const setErrorMessage = (dispatch, message) => {
  dispatch({
    type: "set_form_message",
    payload: { type: "error", message },
  });
};

const signup = (dispatch) => {
  return async (data, role, cb = false) => {
    resetFormMessage(dispatch)();
    try {
      const formData = prepareFields(data);
      formData.role = role;
      const response = await api.post("/users", formData);
      if (formData.password !== formData.cpassword) {
        setErrorMessage(dispatch, "The passwords do not match");
        return;
      }
      dispatch({
        type: "set_form_message",
        payload: { type: "success", message: getRegisterSuccessMessage() },
      });
    } catch (error) {
      cb && cb();
      setErrorMessage(dispatch, error.response.data.message);
    }
  };
};

const signin = (dispatch) => {
  return async (data, cb) => {
    resetFormMessage(dispatch)();
    try {
      const response = await api.post("/login", data);
      setToken(dispatch)(response.data.token, response.data.user.role);
      setUserData(dispatch, response.data.user);
      dispatch({
        type: "set_form_message",
        payload: { type: "success", message: getLoginSuccessMessage() },
      });
      cb();
    } catch (error) {
      setErrorMessage(dispatch, error.response.data.message);
    }
  };
};

const logout = (dispatch) => {
  return (cb) => {
    Cookies.remove("token");
    Cookies.remove("role");
    dispatch({
      type: "set_token",
      payload: { token: null, role: null },
    });
    console.log("loggin out")
    cb();
  };
};

const updatePassword = (dispatch) => {

  return async (data) => {
    setFormSubmit(dispatch, true);
    try {
      const response = await api.patch("/update_password", data);
      showMessageAlert(dispatch, { type: 'success', message: "Password has been changed", display: "true" });
    } catch (error) {
      showMessageAlert(dispatch, { type: 'error', message: error.response.data.message, display: "true" });
      // alert(error.response.data.message)
    }
    setFormSubmit(dispatch, false);
  };
};

const getToken = (dispatch) => {
  return () => {
    const token = Cookies.get("token");
    if (token) {
      verifyToken(dispatch, token);
    }
  };
};

const setToken = (dispatch) => {
  return (token, role) => {
    if (token) {
      Cookies.set("token", token);
      Cookies.set("role", role);
      setAuthToken(token);
      dispatch({
        type: "set_token",
        payload: { token, role },
      });
    }
  };
};

const verifyToken = async (dispatch, token) => {
  try {
    const response = await api.post(
      "/re_login",
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    setToken(dispatch)(response.data.token, response.data.user.role);
    setUserData(dispatch, response.data.user);
    dispatch({
      type: "set_form_message",
      payload: { type: "success", message: getLoginSuccessMessage() },
    });
  } catch (error) {
    Cookies.remove("token");
    Cookies.remove("role");
    setErrorMessage(dispatch, error.response.data.message);
  }
};

const setUserData = (dispatch, data) => {
  dispatch({
    type: "set_user",
    payload: data,
  });
};

const prepareFields = (data) => {
  const formData = data.reduce((obj, item) => {
    obj[item.name] = item.value;
    return obj;
  }, {});
  return formData;
};

const setFormSubmit = (dispatch, state) => {
  dispatch({
    type: "set_form_submit",
    payload: state,
  });
};

const showMessageAlert = (dispatch, globalState) => {
  dispatch({
    type: "show_message_alert",
    payload: globalState,
  });
};

const hideMessageAlert = (dispatch) => {
  return () => {
    showMessageAlert(dispatch, {type: '', message: '', display: ''});
  };
};

export const { Context, Provider } = createDataContext(
  authReducer,
  {
    signup,
    signin,
    resetFormMessage,
    setToken,
    getToken,
    logout,
    updatePassword,
    hideMessageAlert,
  },
  state
);

const offensiveWordList = ["arse", "ass", "asshole", "homosexual", "homophobic", "racist", "gay", "lgbt", "jew", "jewish", "anti-semitic", "chink", "muslims", "muslim", "isis", "islamophobe", "homophobe ", "bombing", "sexyhot", "bastard", "bitch", "fucker", "cunt", "damn", "fuck", "goddamn", "shit", "motherfucker", "nigga", "nigger", "prick", "shit", "shit ass", "shitass", "son of a bitch", "whore", "thot", "slut", "faggot", "dick", "pussy", "penis", "vagina", "negro", "coon", "bitched", "sexist", "freaking", "cock", "sucker", "lick", "licker", "rape", "molest", "anal", "buttrape", "coont", "cancer", "sex", "retard", "fuckface", "dumbass", "5h1t", "5hit", "a_s_s", "a2m", "a55", "adult", "amateur", "anal", "anal impaler", "anal leakage", "anilingus", "anus", "ar5e", "arrse", "arse", "arsehole", "ass", "ass fuck", "asses", "assfucker", "ass-fucker", "assfukka", "asshole", "asshole", "assholes", "assmucus", "assmunch", "asswhole", "autoerotic", "b!tch", "b00bs", "b17ch", "b1tch", "ballbag", "ballsack", "bang (one's) box", "bangbros", "bareback", "bastard", "beastial", "beastiality", "beef curtain", "bellend", "bestial", "bestiality", "bi+ch", "biatch", "bimbos", "birdlock", "bitch", "bitch tit", "bitcher", "bitchers", "bitches", "bitchin", "bitching", "bloody", "blow job", "blow me", "blow mud", "blowjob", "blowjobs", "blue waffle", "blumpkin", "boiolas", "bollock", "bollok", "boner", "boob", "boobs", "booobs", "boooobs", "booooobs", "booooooobs", "breasts", "buceta", "bugger", "bum", "bunny fucker", "bust a load", "busty", "butt", "butt fuck", "butthole", "buttmuch", "buttplug", "c0ck", "c0cksucker", "carpet muncher", "carpetmuncher", "cawk", "chink", "choade", "chota bags", "cipa", "cl1t", "clit", "clit licker", "clitoris", "clits", "clitty litter", "clusterfuck", "cnut", "cock", "cock pocket", "cock snot", "cockface", "cockhead", "cockmunch", "cockmuncher", "cocks", "cocksuck ", "cocksucked ", "cocksucker", "cock-sucker", "cocksucking", "cocksucks ", "cocksuka", "cocksukka", "cok", "cokmuncher", "coksucka", "coon", "cop some wood", "cornhole", "corp whore", "cox", "cum", "cum chugger", "cum dumpster", "cum freak", "cum guzzler", "cumdump", "cummer", "cumming", "cums", "cumshot", "cunilingus", "cunillingus", "cunnilingus", "cunt", "cunt hai", "cuntbag", "cuntlick ", "cuntlicker ", "cuntlicking ", "cunts", "cuntsicle", "cunt-struck", "cut rope", "cyalis", "cyberfuc", "cyberfuck ", "cyberfucked ", "cyberfucker", "cyberfuckers", "cyberfucking ", "d1ck", "damn", "dick", "dick hole", "dick shyt", "dickhead", "dildo", "dildos", "dink", "dinks", "dirsa", "dirty sanchez", "dlck", "dog-fucker", "doggie style", "doggiestyle", "doggin", "dogging", "donkeyribber", "doosh", "duche", "dyke", "eat a dick", "eat hair pie", "ejaculate", "ejaculated", "ejaculates ", "ejaculating ", "ejaculatings", "ejaculation", "ejakulate", "erotic", "f u c k", "f u c k e r", "f_u_c_k", "f4nny", "facial", "fag", "fagging", "faggitt", "faggot", "faggs", "fagot", "fagots", "fags", "fanny", "fannyflaps", "fannyfucker", "fanyy", "fatass", "fcuk", "fcuker", "fcuking", "feck", "fecker", "felching", "fellate", "fellatio", "fingerfuck ", "fingerfucked ", "fingerfucker ", "fingerfuckers", "fingerfucking ", "fingerfucks ", "fist fuck", "fistfuck", "fistfucked ", "fistfucker ", "fistfuckers ", "fistfucking ", "fistfuckings ", "fistfucks ", "flange", "flog the log", "fook", "fooker", "fuck hole", "fuck puppet", "fuck trophy", "fuck yo mama", "fuck", "fucka", "fuck-ass", "fuck-bitch", "fucked", "fucker", "fuckers", "fuckhead", "fuckheads", "fuckin", "fucking", "fuckings", "fuckingshitmotherfucker", "fuckme ", "fuckmeat", "fucks", "fucktoy", "fuckwhit", "fuckwit", "fudge packer", "fudgepacker", "fuk", "fuker", "fukker", "fukkin", "fuks", "fukwhit", "fukwit", "fux", "fux0r", "gangbang", "gangbang", "gang-bang", "gangbanged ", "gangbangs ", "gassy ass", "gaylord", "gaysex", "goatse", "god", "god damn", "god-dam", "goddamn", "goddamned", "god-damned", "ham flap", "hardcoresex ", "hell", "heshe", "hoar", "hoare", "hoer", "homo", "homoerotic", "hore", "horniest", "horny", "hotsex", "how to kill", "how to murdep", "jackoff", "jack-off ", "jap", "jerk", "jerk-off ", "jism", "jiz ", "jizm ", "jizz", "kawk", "kinky jesus", "knob", "knob end", "knobead", "knobed", "knobend", "knobend", "knobhead", "knobjocky", "knobjokey", "kock", "kondum", "kondums", "kum", "kummer", "kumming", "kums", "kunilingus", "kwif", "l3i+ch", "l3itch", "labia", "len", "lmao", "lmfao", "lmfao", "lust", "lusting", "m0f0", "m0fo", "m45terbate", "ma5terb8", "ma5terbate", "mafugly", "masochist", "masterb8", "masterbat*", "masterbat3", "masterbate", "master-bate", "masterbation", "masterbations", "masturbate", "mof0", "mofo", "mo-fo", "mothafuck", "mothafucka", "mothafuckas", "mothafuckaz", "mothafucked ", "mothafucker", "mothafuckers", "mothafuckin", "mothafucking ", "mothafuckings", "mothafucks", "mother fucker", "mother fucker", "motherfuck", "motherfucked", "motherfucker", "motherfuckers", "motherfuckin", "motherfucking", "motherfuckings", "motherfuckka", "motherfucks", "muff", "muff puff", "mutha", "muthafecker", "muthafuckker", "muther", "mutherfucker", "n1gga", "n1gger", "nazi", "need the dick", "nigg3r", "nigg4h", "nigga", "niggah", "niggas", "niggaz", "nigger", "niggers ", "nob", "nob jokey", "nobhead", "nobjocky", "nobjokey", "numbnuts", "nut butter", "nutsack", "omg", "orgasim ", "orgasims ", "orgasm", "orgasms ", "p0rn", "pawn", "pecker", "penis", "penisfucker", "phonesex", "phuck", "phuk", "phuked", "phuking", "phukked", "phukking", "phuks", "phuq", "pigfucker", "pimpis", "piss", "pissed", "pisser", "pissers", "pisses ", "pissflaps", "pissin ", "pissing", "pissoff ", "poop", "porn", "porno", "pornography", "pornos", "prick", "pricks ", "pron", "pube", "pusse", "pussi", "pussies", "pussy", "pussy fart", "pussy palace", "pussys ", "queaf", "queer", "rectum", "retard", "rimjaw", "rimming", "s hit", "s.o.b.", "s_h_i_t", "sadism", "sadist", "sandbar", "sausage queen", "schlong", "screwing", "scroat", "scrote", "scrotum", "semen", "sex", "sh!+", "sh!t", "sh1t", "shag", "shagger", "shaggin", "shagging", "shemale", "shi+", "shit", "shit fucker", "shitdick", "shite", "shited", "shitey", "shitfuck", "shitfull", "shithead", "shiting", "shitings", "shits", "shitted", "shitter", "shitters ", "shitting", "shittings", "shitty ", "skank", "slope", "slut", "slut bucket", "sluts", "smegma", "smut", "snatch", "son-of-a-bitch", "spac", "spunk", "t1tt1e5", "t1tties", "teets", "teez", "testical", "testicle", "tit", "tit wank", "titfuck", "tits", "titt", "tittie5", "tittiefucker", "titties", "tittyfuck", "tittywank", "titwank", "tosser", "turd", "tw4t", "twat", "twathead", "twatty", "twunt", "twunter", "v14gra", "v1gra", "vagina", "viagra", "vulva", "w00se", "wang", "wank", "wanker", "wanky", "whoar", "whore", "willies", "willy", "wtf", "xrated", "xxx", "sucker", "dumbass", "kys", "kill", "die", "cliff", "bridge", "shooting", "shoot", "bomb", "terrorist", "terrorism", "bombed", "trump", "maga", "conservative", "make america great again", "far right", "necrophilia", "mongoloid", "furfag", "cp", "pedo", "pedophile", "pedophilia", "child predator", "predatory", "depression", "cut myself", "i want to die", "fuck life", "redtube", "loli", "lolicon", "cub",];

export const containsOffensiveWords = (inputText) => {
  let lowerInputText = inputText.toLowerCase();
  let hasOffensiveWord = false;
  for (let index = 0; index < offensiveWordList.length; index++) {
    const needle = offensiveWordList[index];
    if(lowerInputText.indexOf()) {
      
    }
    
  }
  return inputText && inputText.length ? true : false;
};
