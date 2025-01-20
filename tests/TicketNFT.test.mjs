import hardhat from "hardhat";
import { expect } from "chai";

const { ethers } = hardhat;

describe("TicketNFT Contract", function () {
  let TicketNFT, ticketNFT, owner, addr1, addr2;

  beforeEach(async function () {
    TicketNFT = await ethers.getContractFactory("TicketNFT");
    ticketNFT = await TicketNFT.deploy();
    await ticketNFT.deployed();

    [owner, addr1, addr2] = await ethers.getSigners();
  });

  it("Should deploy correctly and set the ticket counter to 0", async function () {
    const ticketCounter = await ticketNFT.ticketCounter();
    expect(ticketCounter).to.be.eql(ethers.BigNumber.from(0));
  });

  it("Should mint a ticket and increment the ticket counter", async function () {
    await ticketNFT.mintTicket(addr1.address, "Event Metadata");
    const ticketCounter = await ticketNFT.ticketCounter();
    expect(ticketCounter).to.be.eql(ethers.BigNumber.from(1));
  });

  it("Should batch mint tickets", async function () {
    const recipients = [addr1.address, addr2.address];
    await ticketNFT.mintBatchTickets(recipients, "Batch Metadata");

    const ticketCounter = await ticketNFT.ticketCounter();
    expect(ticketCounter).to.be.eql(ethers.BigNumber.from(recipients.length));
  });
});
