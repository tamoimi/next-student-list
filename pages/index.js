import { useForm } from "react-hook-form";

const StudentList = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const postStudents = async (data) => {
    console.log(data);

    // 총점 평균
    

    const response = await (
      await fetch("/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data,
        }),
      })
    ).json();
    console.log(response);
  };

  return (
    <>
      <form onSubmit={handleSubmit(postStudents)}>
        <h1>학생기록부</h1>
        <label>학생이름</label>
        <input
          {...register("studentName", {
            required: "필수 입력값 입니다.",
          })}
          placeholder="홍길동"
        />
        {errors.studentName && <p>{errors.studentName.message}</p>} <br />
        <label>학년</label>
        <select {...register("studentGrade")}>
          <option value="grade1">1학년</option>
          <option value="grade2">2학년</option>
          <option value="grade3">3학년</option>
        </select>{" "}
        <br />
        <label>국어점수</label>
        <input
          type="number"
          {...register("kor", {
            required: "필수 입력값 입니다.",
            min: { value: 0, message: "점수는 0이상이여야 합니다." },
            max: { value: 100, message: "점수는 100이하여야 합니다." },
          })}
        />
        {errors.kor && <p>{errors.kor.message}</p>} <br />
        <label>영어점수</label>
        <input
          type="number"
          min="0"
          step="1"
          {...register("eng", {
            required: "필수 입력값 입니다.",
            min: { value: 0, message: "점수는 0이상이여야 합니다." },
            max: { value: 100, message: "점수는 100이하여야 합니다." },
          })}
        />
        {errors.eng && <p>{errors.eng.message}</p>} <br />
        <label>수학점수</label>
        <input
          type="number"
          {...register("math", {
            required: "필수 입력값 입니다.",
            min: { value: 0, message: "점수는 0이상이여야 합니다." },
            max: { value: 100, message: "점수는 100이하여야 합니다." },
          })}
        />
        {errors.math && <p>{errors.math.message}</p>} <br />
        <button type="submit">제출하기</button>
        <button type="button">불러오기</button>
      </form>
      <style>
        {`
      html {
        background: #f2f2f2;
      }
      div {
        width: 600px;
        height: 600px;
        margin: 0 auto;
        background: white;
        border-radius: 10px;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      }
      form {
        margin: 100px 0;
        padding: 100px 0;
        text-align: center;
      }
      label {
        display: inline-block;
        width: 100px;
        height: 40px;
        line-height: 40px;
      }
      input,
      select  {
        width: 140px;
        height: 30px;
        border: none;
        border-radius: 4px;
        background: #f2f2f2;
        padding: 0 15px;
        margin-top: 20px
      }
      p {
        display: inline;
        color: tomato;
        font-size: 12px;
        margin: 0 0 0 30px;
      }
      select {
        margin-right: 30px;
      }
      button {
        width: 120px;
        height: 40px;
        border: none;
        border-radius: 4px;
        background: #97D2EC;
        margin: 30px 15px;
        cursor: pointer;
        transition: all 0.5s;
      }
      button:hover {
        background: #AEBDCA;
      }
      `}
      </style>
    </>
  );
};

export default StudentList;
