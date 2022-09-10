const express = require('express');
const router = express.Router();
const {default: axios} = require('axios');

/**
 * @swagger
 * /etherscan-api/{txhash}:
 *  get:
 *      summary: etherscan api transaction conformation [ERC20 network]
 *      description: etherscan api transaction conformation [ERC20 network]
 *      parameters:
 *          - name: txhash
 *            description: transaction hash
 *            in: path
 *            required: true
 *            type: string
 *      responses:
 *          200:
 *              description: approved
 *          424:
 *              description: unapproved
 *          500:
 *              description: server internal error
 */
router.get("/etherscan-api/:txhash", etherScanController);

async function etherScanController(req, res) {
    try {
        const transaction = await axios.get(`https://api.etherscan.io/api?module=transaction&action=gettxreceiptstatus&txhash=${req.params.txhash}&apikey=ZMU77FQ31P8H2WF4NCU2H2Y2551MXKZZPW`)

        console.log(transaction.data.result.status)

        if (transaction.data.result.status !== "1")
            return res.status(424).json({
                message: "unapproved"
            })

        return res.status(200).json({
            message: "approved"
        })
    } catch (err) {
        console.log(err)
    }
}

/**
 * @swagger
 * /tronscan-api/{txhash}:
 *  get:
 *      summary: tronscan api transaction conformation [TRC20 network]
 *      description: tronscan api transaction conformation [TRC20 network]
 *      parameters:
 *          - name: txhash
 *            description: transaction hash
 *            in: path
 *            required: true
 *            type: string
 *      responses:
 *          200:
 *              description: approved
 *          424:
 *              description: unapproved
 *          500:
 *              description: server internal error
 */
router.get("/tronscan-api/:txhash", tronScanController);

async function tronScanController(req, res) {
    try {
        const transaction = await axios.get(`https://apilist.tronscan.org/api/transaction-info?hash=${req.params.txhash}`)

        if (transaction.data.confirmed !== true)
            return res.status(424).json({
                message: "unapproved"
            })

        return res.status(200).json({
            message: "approved"
        })
    } catch (err) {
        console.log(err)
    }
}

/**
 * @swagger
 * /blockchain-api/{txhash}:
 *  get:
 *      summary: blockchain api transaction conformation [bitcoin network]
 *      description: blockchain api transaction conformation [bitcoin network]
 *      parameters:
 *          - name: txhash
 *            description: transaction hash
 *            in: path
 *            required: true
 *            type: string
 *      responses:
 *          200:
 *              description: approved
 *          424:
 *              description: unapproved
 *          500:
 *              description: server internal error
 */
router.get("/blockchain-api/:txhash", blockchainController);

async function blockchainController(req, res) {
    try {
        const transaction = await axios.get(`https://blockchain.info/tx/${req.params.txhash}?show_adv=false&format=json`);
        const getBlockCount = await axios.get(`https://blockchain.info/q/getblockcount`);

        if (transaction.data.block_height === null && (+getBlockCount.data - transaction.data.block_height + 1 <= 0))
            return res.status(424).json({
                message: "unapproved"
            })

        return res.status(200).json({
            message: "approved"
        })
    } catch (err) {
        console.log(err)
    }
}

/**
 * @swagger
 * /dogechain-api/{txhash}:
 *  get:
 *      summary: dogechain api transaction conformation [dogecoinn network]
 *      description: dogechain api transaction conformation [dogecoinn network]
 *      parameters:
 *          - name: txhash
 *            description: transaction hash
 *            in: path
 *            required: true
 *            type: string
 *      responses:
 *          200:
 *              description: approved
 *          424:
 *              description: unapproved
 *          500:
 *              description: server internal error
 */
router.get("/dogechain-api/:txhash", dogeChainController);

async function dogeChainController(req, res) {
    try {
        const transaction = await axios.get(`https://dogechain.info/api/v1/transaction/${req.params.txhash}`);

        if (transaction.data.confirmations <= 0)
            return res.status(424).json({
                message: "unapproved"
            })

        return res.status(200).json({
            message: "approved"
        })
    } catch (err) {
        console.log(err)
    }
}


module.exports = router;