// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
    let pincodes = {
        173212: ["Solan", "Himachal Pradesh"],
        173213: ["Kasauli", "Himachal Pradesh"],
        174103: ["Baddi", "Himachal Pradesh"],
    };
    res.status(200).json(pincodes);
}
