import Mock from "mockjs";
Mock.mock("/fake/excel", {
    "data|10": [
        {
            "id|+1": 0,
            name: "@cname()",
            description: "@csentence()",
            avatar: '@dataImage("64x64")',
        },
    ],
});
export {};
