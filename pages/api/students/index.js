import client from "../../libs/prismaClient";

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log("post 호출");

    const {
      body: {
        data: { studentName, studentGrade, kor, eng, math },
      },
    } = req;

    const korNumber = parseInt(kor);
    const engNumber = parseInt(eng);
    const mathNumber = parseInt(math);

    // 여기서 연산
    const total = korNumber + engNumber + mathNumber;
    const average = total / 3;

    console.log(
      "백엔드 로그: ",
      studentName,
      studentGrade,
      kor,
      eng,
      math,
      total
    );
    const result = await client.student.create({
      data: {
        studentName,
        studentGrade: studentGrade,
        kor: korNumber,
        eng: engNumber,
        math: mathNumber,
        total: parseInt(total),
        average: parseInt(average),
      },
    });
    res.status(200).json(result);
  }

  if (req.method === "GET") {
    console.log("get 호출");
    const result = await client.student.findMany({});
    res.status(200).json(result);
  }

  if (req.method === "DELETE") {
    console.log("DELETE 호출");
    const {
      body: { id },
    } = req;

    const result = await client.student.delete({
      where: {
        id: +id,
      },
    });
    res.status(200).json(result);
  }
}
