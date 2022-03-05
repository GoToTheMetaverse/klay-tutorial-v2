<script>
	import MyGame from '../MyGame.json';

	let caver = null;
	let contract;
	let balance;
	let balance_contract;
	let bet_size;

	let msg = '로그인 전';
	const onButton = async () => {
		console.log('onButton');
		msg = '카이카스를 확인해';
		try {
			const ret = await window.klaytn.enable();
			console.log('ret', ret);
			console.log('onButton');
			msg = '지갑: ' + ret[0];

			caver = new Caver(window.klaytn);
			contract = null;
			balance = await caver.klay.getBalance(addr);
			balance_contract = 0;
			bet_size = 0;
			// balance_contract = await contract.methods.get_balance().call();
			// bet_size = await contract.methods.get_bet_size().call();
			console.log('login ok', { contract, balance, balance_contract, bet_size });
		} catch (err) {
			console.log('err', err);
			msg = '로그인 실패';
		}
	};

	let a = 0;
	let src_a = `/a${a}.png`;
	let alt_a = `a${a}`;
	const onChange = () => {
		a++;
		a %= 3;
		src_a = `/a${a}.png`;
		alt_a = `a${a}`;
	};
	const onPlay = () => {
		console.log('onPlay');
	};
</script>

<div class="tw-red">
	<h1 class="text-4xl">살벌한 가위 바위 보</h1>
	<div>{msg}</div>
	<div class="pt-2">
		<button
			class="
		px-4
		py-2
		rounded-full
		bg-indigo-800
		"
			on:click={onButton}
		>
			지갑 로그인
		</button>
	</div>

	<!-- {#if caver}
		<div>
			<div>컨트렉트 정보</div>
			<div>내잔고: {balance}</div>
			<div>컨트렉트 잔고: {balance_contract}</div>
			<div>게임비: {bet_size}</div>
		</div>
	{/if} -->

	<div>
		<div>내가 낼꺼</div>
		<div>
			<button on:click={onChange}>
				<img src={src_a} alt={alt_a} />
			</button>
		</div>
		<div>
			<button on:click={onPlay}>게임 플레이</button>
		</div>
	</div>
</div>
