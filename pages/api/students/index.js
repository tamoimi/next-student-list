import client from "../../libs/prismaClient";

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log("post 호출");

    const {
      body: {
        data: { studentName, studentGrade, kor, eng, math },
      },
    } = req;

    // 여기서 연산
    

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

  if (req.method === "GET") {
    console.log("get 호출");

    // const {
    //   body: {
    //     data: { studentName, studentGrade, kor, eng, math },
    //   },
    // } = req.query;

    const result = await client.student.findMany({});
    console.log(result);
    res.status(200).json(result);
  }

  if (req.method === "DELETE") {
    console.log("DELETE 호출");
    const result = await client.student.delete({
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
