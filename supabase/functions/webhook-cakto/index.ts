import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

Deno.serve(async (req) => {
  try {
    const payload = await req.json()
    
    const status = payload.status?.toLowerCase() || ''
    const event = payload.event?.toLowerCase() || ''

    if (status === 'paid' || status === 'aprovado' || event === 'pedido_aprovado') {
      const email = payload.customer?.email

      // Captura o rastro que a Landing Page injetou na URL do checkout
      const utmSource = payload.utm_source || payload.src || null
      const utmMedium = payload.utm_medium || null
      const utmCampaign = payload.utm_campaign || null

      if (!email) {
        return new Response(JSON.stringify({ error: "Email nao encontrado" }), { status: 400 })
      }

      const supabaseAdmin = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
      )

      // Atualiza a tabela profiles cruzando os dados com o e-mail do comprador
      const { error: updateError } = await supabaseAdmin
        .from('profiles')
        .update({
          utm_source: utmSource,
          utm_medium: utmMedium,
          utm_campaign: utmCampaign
        })
        .eq('email', email)

      if (updateError) {
        return new Response(JSON.stringify({ error: updateError.message }), { status: 500 })
      }
    }

    return new Response(JSON.stringify({ success: true }), { 
      headers: { "Content-Type": "application/json" } 
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 400 })
  }
})