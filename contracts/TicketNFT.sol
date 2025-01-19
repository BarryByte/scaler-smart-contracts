// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract TicketNFT is ERC721 {
    uint256 public ticketCounter;
    mapping(uint256 => string) public ticketMetadata; // Mapping tokenId to metadata (e.g., event details)

    constructor() ERC721("EventTicket", "ETICKET") {
        ticketCounter = 0;
    }

    // Mint a single ticket for a specific event
    function mintTicket(address to, string memory metadata) public {
        ticketCounter++;
        _mint(to, ticketCounter);
        ticketMetadata[ticketCounter] = metadata; // Store metadata (e.g., event info)
    }

    // Batch mint tickets for an event
    function mintBatchTickets(address[] memory to, string memory metadata) public {
        for (uint256 i = 0; i < to.length; i++) {
            ticketCounter++;
            _mint(to[i], ticketCounter);
            ticketMetadata[ticketCounter] = metadata; // All tickets share the same event metadata
        }
    }

    // Retrieve ticket metadata
    function getTicketMetadata(uint256 tokenId) public view returns (string memory) {
        return ticketMetadata[tokenId];
    }
}
