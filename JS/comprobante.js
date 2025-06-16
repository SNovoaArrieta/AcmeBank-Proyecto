const datos = JSON.parse(localStorage.getItem('comprobante'));
if (datos) {
    document.getElementById('fecha').textContent = `📅 Fecha: ${datos.fecha}`;
    document.getElementById('referencia').textContent = `🔢 Referencia: ${datos.referencia}`;
    document.getElementById('tipo').textContent = `💳 Tipo: ${datos.tipo}`;
    document.getElementById('concepto').textContent = `📝 Concepto: ${datos.concepto}`;
    document.getElementById('valor').textContent = `💰 Valor: $${datos.valor.toFixed(2)}`;
} else {
    document.body.innerHTML = '<h3>No hay datos del comprobante.</h3>';
}