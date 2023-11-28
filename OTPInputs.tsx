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
  finalCodeRef,
  inputClassNames,
}: {
  fieldLength: number;
  finalCodeRef: MutableRefObject<number>;
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
    if (Number.isNaN(+inputValue)) return;

    const newOtp: string[] = [...otp];
    newOtp[index] = inputValue.substring(inputValue.length - 1);
    setOtp(newOtp);
  };
  const onKeyup = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace") {
      if (activeOtpInput > 0) {
        setActiveOtpInput((pervious) => --pervious);
      }
      return;
    }
    const enteredValue = (event.target as HTMLInputElement).value;
    if (!enteredValue) return;

    const joinedCode = otp.join("");
    finalCodeRef.current = +joinedCode;
    if (activeOtpInput < fieldLength - 1) {
      setActiveOtpInput((pervious) => ++pervious);
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
              type="text"
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
