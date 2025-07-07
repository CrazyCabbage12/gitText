
const tabledata = [
    {
        date: "2025-07-01",
        name: "Alice",
        state: "New York",
        city: "New York City",
        address: "123 Wall Street",
        zip: "10001"
    },
    {
        date: "2025-07-02",
        name: "Bob",
        state: "California",
        city: "Los Angeles",
        address: "456 Hollywood Blvd",
        zip: "90001"
    },
    {
        date: "2025-07-03",
        name: "Charlie",
        state: "Texas",
        city: "Houston",
        address: "789 Main Street",
        zip: "77001"
    },
    {
        date: "2025-07-04",
        name: "David",
        state: "Florida",
        city: "Miami",
        address: "101 Ocean Drive",
        zip: "33101"
    },
    {
        date: "2025-07-05",
        name: "Eve",
        state: "Illinois",
        city: "Chicago",
        address: "222 Michigan Ave",
        zip: "60601"
    },
    {
        date: "2025-07-06",
        name: "Frank",
        state: "Pennsylvania",
        city: "Philadelphia",
        address: "333 Liberty Bell Way",
        zip: "19101"
    },
    {
        date: "2025-07-07",
        name: "Grace",
        state: "Ohio",
        city: "Columbus",
        address: "444 Statehouse Street",
        zip: "43201"
    },
    {
        date: "2025-07-08",
        name: "Hank",
        state: "Michigan",
        city: "Detroit",
        address: "555 Woodward Avenue",
        zip: "48201"
    },
    {
        date: "2025-07-09",
        name: "Ivy",
        state: "Georgia",
        city: "Atlanta",
        address: "666 Peachtree Street",
        zip: "30301"
    },
    {
        date: "2025-07-10",
        name: "John",
        state: "Arizona",
        city: "Phoenix",
        address: "777 Camelback Road",
        zip: "85001"
    },
    {
        date: "2025-07-11",
        name: "Karen",
        state: "Nevada",
        city: "Las Vegas",
        address: "888 Las Vegas Blvd",
        zip: "89101"
    },
    {
        date: "2025-07-12",
        name: "Liam",
        state: "Washington",
        city: "Seattle",
        address: "999 Pike Place",
        zip: "98101"
    },
    {
        date: "2025-07-13",
        name: "Mia",
        state: "Colorado",
        city: "Denver",
        address: "111 16th Street Mall",
        zip: "80201"
    },
    {
        date: "2025-07-14",
        name: "Noah",
        state: "Oregon",
        city: "Portland",
        address: "222 Broadway",
        zip: "97201"
    },
    {
        date: "2025-07-15",
        name: "Olivia",
        state: "Massachusetts",
        city: "Boston",
        address: "333 Beacon Street",
        zip: "02101"
    },
    {
        date: "2025-07-16",
        name: "Peter",
        state: "Virginia",
        city: "Richmond",
        address: "444 Monument Avenue",
        zip: "23219"
    },
    {
        date: "2025-07-17",
        name: "Quinn",
        state: "North Carolina",
        city: "Charlotte",
        address: "555 Trade Street",
        zip: "28202"
    },
    {
        date: "2025-07-18",
        name: "Rachel",
        state: "South Carolina",
        city: "Columbia",
        address: "666 Gervais Street",
        zip: "29201"
    },
    {
        date: "2025-07-19",
        name: "Sam",
        state: "Louisiana",
        city: "New Orleans",
        address: "777 Bourbon Street",
        zip: "70116"
    },
    {
        date: "2025-07-20",
        name: "Tina",
        state: "Alabama",
        city: "Birmingham",
        address: "888 20th Street",
        zip: "35203"
    },
    {
        date: "2025-07-21",
        name: "Ursula",
        state: "Mississippi",
        city: "Jackson",
        address: "999 State Street",
        zip: "39201"
    },
    {
        date: "2025-07-22",
        name: "Victor",
        state: "Arkansas",
        city: "Little Rock",
        address: "111 Capitol Avenue",
        zip: "72201"
    },
    {
        date: "2025-07-23",
        name: "Wendy",
        state: "Oklahoma",
        city: "Oklahoma City",
        address: "222 N Robinson Avenue",
        zip: "73102"
    },
    {
        date: "2025-07-24",
        name: "Xander",
        state: "Kansas",
        city: "Topeka",
        address: "333 SW 10th Avenue",
        zip: "66612"
    },
    {
        date: "025-07-25",
        name: "Yvonne",
        state: "Nebraska",
        city: "Lincoln",
        address: "444 P Street",
        zip: "68508"
    },
    {
        date: "2025-07-26",
        name: "Zack",
        state: "Iowa",
        city: "Des Moines",
        address: "555 Grand Avenue",
        zip: "50309"
    },
    {
        date: "2025-07-27",
        name: "Amanda",
        state: "Wisconsin",
        city: "Madison",
        address: "666 East Washington Avenue",
        zip: "53703"
    },
    {
        date: "2025-07-28",
        name: "Brad",
        state: "Minnesota",
        city: "St. Paul",
        address: "777 Kellogg Boulevard",
        zip: "55102"
    },
    {
        date: "2025-07-29",
        name: "Cathy",
        state: "North Dakota",
        city: "Bismarck",
        address: "888 East Boulevard Avenue",
        zip: "58501"
    },
    {
        date: "2025-07-30",
        name: "Derek",
        state: "South Dakota",
        city: "Pierre",
        address: "999 Capitol Avenue",
        zip: "57501"
    },
    {
        date: "2025-07-31",
        name: "Ethan",
        state: "Montana",
        city: "Helena",
        address: "111 North Last Chance Gulch",
        zip: "59620"
    },
    {
        date: "2025-08-01",
        name: "Fiona",
        state: "Idaho",
        city: "Boise",
        address: "222 Capitol Boulevard",
        zip: "83702"
    },
]

export default {
    GetTableData:()=>{
        return {
            code:200,
            data:{
                tableData:[{
                    name: "ncao",
                    price: 89,
                    month: 6,
                }]
            }
        }
    },
    GetCountData:()=>{
        return {
            code:200,
            data:{
                tableData:[{
                    name: "CountData",
                    price: 666,
                    month: "加油",
                }]
            }
        }
    },
    GetUserData: () => {
        return {
            code:200,
            data: {
                tableData: tabledata,
            }
        }
    },
    AddProductData: (req) => {
        // 获取请求体中的数据
        const data = req.body;

        // 确保 data 是一个对象
        let parsedData;
        if (typeof data === 'string') {
            try {
                parsedData = JSON.parse(data); // 尝试解析为 JSON 对象
            } catch (error) {
                console.error("解析请求体为 JSON 时出错:", error);
                return {
                    code: 400,
                    message: "请求参数错误"
                };
            }
        } else {
            parsedData = data; // 如果已经是对象，直接使用
        }

        // 打印解析后的数据
        console.log("解析后的数据:", parsedData.addable);

        // 检查数据是否完整
        if (parsedData && parsedData.address && parsedData.city && parsedData.date && parsedData.name && parsedData.state && parsedData.zip) {
            // 将新数据添加到 tableData 中
            tabledata.push(parsedData);
            return {
                code: 200,
                message: "数据添加成功"
            };
        } else {
            return {
                code: 400,
                message: "请求参数错误"
            };
        }
    }
}