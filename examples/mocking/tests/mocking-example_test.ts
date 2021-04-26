import { Clarinet, Tx, Chain, Account, types, typeDefs, MockContract } from '../../../deno/index.ts';
import { assertEquals } from "https://deno.land/std@0.90.0/testing/asserts.ts";

Clarinet.test({
    name: "returns the ticket price",
    preSetup(): Tx[] {
        let mockOracle = new MockContract("imaginary-oracle-v1", "SP000000000000000000002Q6VF78");
		mockOracle.publicFn("price",{
            inputs: [typeDefs.ascii(24), typeDefs.ascii(24), typeDefs.uint()],
            returns: types.ok(types.uint(2000000))
            });
        return [
           Tx.deployContract(mockOracle)
        ]
    },
    async fn(chain: Chain, accounts: Map<string, Account>) {
		let deployer = accounts.get("deployer")!;

        let wallet_1 = accounts.get("wallet_1")!;
        let block = chain.mineBlock([
            Tx.contractCall(`SP000000000000000000002Q6VF78.imaginary-oracle-v1`, "price",
            [
                types.ascii("usd"),
                types.ascii("stx"),
                types.uint(5)
            ], wallet_1.address),
            
            //Tx.contractCall(`${deployer.address}.mocking-example`, "ticket-price", [], deployer.address)
        ]);
		console.log(block.receipts[0]);
        // assertEquals(block.height, 2);
    },
});

