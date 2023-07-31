import {
  ChangeEvent,
  Fragment,
  KeyboardEvent,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";

const OTPInputs = ({
  fieldLength,
  finalCode,
  inputClassNames,
}: {
  fieldLength: number;
  finalCode: MutableRefObject<number>;
  inputClassNames?: string;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [otp, setOtp] = useState<string[]>(new Array(fieldLength).fill(""));
  const [activeOtpInput, setActiveOtpInput] = useState(0);
  const onInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value: inputValue } = event.target;
    const newOtp: string[] = [...otp];
    newOtp[index] = inputValue.substring(inputValue.length - 1);
    setOtp(newOtp);
  };
  const onKeyup = (event: KeyboardEvent<HTMLInputElement>) => {
    const joinedCode = otp.join("");
    finalCode.current = +joinedCode;
    if (event.key !== "Backspace") {
      if (activeOtpInput < fieldLength - 1) {
        setActiveOtpInput((pervious) => ++pervious);
      }
    } else {
      if (activeOtpInput > 0) {
        setActiveOtpInput((pervious) => --pervious);
      }
    }
  };
  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtpInput]);

  return (
    <Fragment>
      {otp.map((_, index) => {
        return (
          <Fragment key={index}>
            <input
              ref={index === activeOtpInput ? inputRef : null}
              type="number"
              className={inputClassNames}
              onChange={(e) => onInputChange(e, index)}
              value={otp[index]}
              onKeyUp={onKeyup}
            />
          </Fragment>
        );
      })}
    </Fragment>
  );
};

export default OTPInputs;
