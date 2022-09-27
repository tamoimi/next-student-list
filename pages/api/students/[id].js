import client from "../../libs/prismaClient";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { id } = req.query;
    // console.log("id", id);
    const result = await client.Student.findUnique({
      select: {
        id: true,
        studentName: true,
        studentGrade: true,
        kor: true,
        eng: true,
        math: true,
        total: true,
        average: true,
      },
      where: {
        id: +id,
      },
    });
    // console.log("백엔드 조회 결과:", result);
    res.status(200).json(result);
  }

  if (req.method === "PUT") {
    const {
      body: {
        data: { studentName, studentGrade, kor, eng, math },
      },
      query: { id },
    } = req;

    const korNumber = parseInt(kor);
    const engNumber = parseInt(eng);
    const mathNumber = parseInt(math);

    const total = korNumber + engNumber + mathNumber;
    const average = parseInt(total / 3);

    const result = await client.student.update({
      data: {
        studentName,
        studentGrade,
        kor: korNumber,
        eng: engNumber,
        math: mathNumber,
        total: total,
        average: average,
      },
      where: {
        id: +id,
      },
    });
    res.status(200).json({ result });
  }
}
