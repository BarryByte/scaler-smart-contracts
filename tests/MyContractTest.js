const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TicketNFT", function () {
    let TicketNFT;
    let ticketNFT;
    let owner;
    let addr1;

    beforeEach(async function () {
        TicketNFT = await ethers.getContractFactory("TicketNFT");
        [owner, addr1] = await ethers.getSigners();
        ticketNFT = await TicketNFT.deploy();
        await ticketNFT.deployed();
    });

    it("should deploy the contract", async function () {
        expect(ticketNFT.address).to.not.equal(0);
    });

    it("should mint a ticket", async function () {
        await ticketNFT.mintTicket(addr1.address);
        const balance = await ticketNFT.balanceOf(addr1.address);
        expect(balance).to.equal(1);
    });

    it("should increment ticketCounter", async function () {
        await ticketNFT.mintTicket(addr1.address);
        await ticketNFT.mintTicket(addr1.address);
        expect(await ticketNFT.ticketCounter()).to.equal(2);
    });
});
