import { use, useEffect, useState } from "react";
import { Obra } from "../../types/Obra";
import { getTodasObras } from "../../services/ObraService";
import LayoutPadrao from "../../components/LayouPadrao/LayoutPadrao";
import ObraCard from "../../components/Obra/ObraCard";
import { on } from "events";

export default function ObraPage() {

	const [obraDados, setObraDados] = useState<Obra[]>([]);

	useEffect(() => {
		const fetchObra = async () => {
			try {
				const data = await getTodasObras();
				setObraDados(data);
			} catch (error) {
				console.error("Erro ao buscar obra:", error);
			}
		};

		fetchObra();
	});

	return (

		<LayoutPadrao>
			<div className="obra-page">
				<h1>Selecione a obra </h1>

				{obraDados.map((obra) => (
					<ObraCard
						key={obra.id}
						obra={obra}
						onEditar={() => (obra)}
						onDeletar={() => (obra.id)}
						onExpandir={() => (obra.id)}
					/>
				))}

			</div>
		</LayoutPadrao>
	);
}