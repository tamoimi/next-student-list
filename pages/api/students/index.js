import client from "../../libs/prismaClient";

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log("post 호출");

    const {
      body: {
        data: { studentName, studentGrade, kor, eng, math },
      },
    } = req;

    console.log("백엔드 로그: ", studentName, studentGrade, kor, eng, math);
    const result = await client.student.create({
      data: {
        studentName,
        studentGrade: studentGrade,
        kor: parseInt(kor),
        eng: parseInt(eng),
        math: parseInt(math),
      },
    });

    res.status(200).json(result);
  }
}
