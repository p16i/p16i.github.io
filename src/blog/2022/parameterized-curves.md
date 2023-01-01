---
path: "/blog/2022-parameterized-curves"
date: "2022-05-21"
title: "Parameterized Curves"
---

Consider a smooth function $\gamma : [a, b]  \rightarrow  C \subset \R^2$ or a curve. We can compute its length by 

$$
L(\gamma) = \int_a^b \|  \gamma' (t) \| \text d t 
$$

where $\gamma'(t) := \text d \gamma / \text d t$  is the velocity vector. We call it regular if its velocity never vanishes, i.e.,

$$
\forall t \in [a, b] :  \gamma'(t) \ne \mathbf 0 
$$

Consider another curve $\tilde \gamma : [c, d] \rightarrow C$ that has the same trace as $\gamma$ . Said differently, these two curves look the same except we end up at different locations on the curves at same time step. 

<div align="center">
  <img src="https://i.imgur.com/vaA59lt.png"/>
  <div style="color: gray">Circle with different parameterizations</div>
  <br/>
</div>

Suppose we have a smooth map $\varphi : [c, d] \rightarrow [a, b]$ with $\forall \tilde t \in [c, d] : \varphi'(\tilde t ) \ne \mathbf 0$ . The condition of $\varphi '(\tilde t)$ implies that $\varphi$  is bijective. We then have $\tilde \gamma = \gamma \circ \varphi$ , and we call it a reparameterization of the parameterized curve $\gamma$. 

With $\varphi,$  we can show that $\tilde \gamma$  is also regular

$$
\forall \tilde t \in [c, d] : \tilde \gamma'(\tilde t) \ne \boldsymbol 0\quad
$$

*Proof:* Using the chain rule, we have
    
$$
\begin{aligned}
{\tilde \gamma'}(\tilde t) &=  \gamma' (\varphi (\tilde t)) \cdot  \varphi'(\tilde t)    
\end{aligned}
$$

Because $\gamma(t)$  is regular, i.e., $\forall t \in [a, b]: \gamma' (t) \ne \mathbf 0$ and $\varphi'(\tilde t) > 0$  by construction, we can conclude that 

$$
\forall \tilde t \in [c, b] : {\tilde\gamma'} (\tilde t) \ne \mathbf 0
$$

◾


and the length of the curve is invariant to parameterization; that is 

$$
 L(\gamma) =  L(\tilde \gamma) 
$$

*Proof:* Using the chain rule, we have 

$$
\tilde \gamma' (\tilde t) = \frac{\text d \tilde \gamma (\tilde t ) }{\text d \tilde t }  = \frac{\text d \gamma (t)} {\text d t}  \frac{\text d  t}{\text d \tilde  t}  =   \gamma '(t)    \varphi'(\tilde t)
$$

and the 

$$
\text d t  = \varphi'(\tilde t) \text d\tilde t 
$$

Therefore, we can show that 

$$
\begin{aligned}
L( \gamma) &= \int_a^b \| {\gamma'}(t) \| \text d t \\
&= \int_{\varphi^{-1}(a)}^{\varphi^{-1}(b)} \|  \gamma'( \varphi (\tilde t)) \| \varphi'(\tilde t) \text d \tilde t \\

&= \int_c^d  \|  \gamma'( \varphi (\tilde t)) \varphi'(\tilde t) \|  \text d \tilde t \\ 

&= \int_c^d \| {\gamma'}(\tilde t)\| \text d\tilde t \\
&= L(\tilde \gamma).
\end{aligned}
$$

◾


The invariant property implies that there seems to be infinitely many parameterizations of a curve, and this could be problematic in practices. In following, we impose a constraint of the speed of the curve.

## Unit Speed and Arc-length

Suppose $\gamma$  has the unit speed that is 

$$
\forall t \in [a, b] : \|  \gamma'(t) \| =  1.
$$

We first can show that the velocity vector is orthogonal to the acceleration vector

$$
 \gamma'(t)^\top \gamma''(t) = 0
$$

*Proof:* With the assumption, we have 
    
$$
\gamma' (t) ^\top \gamma'(t) = 1
$$

Differentiating w.r.t. $t$ yields 

$$
    \gamma'(t)^\top \gamma''(t) + \gamma''(t)^\top \gamma'(t)  = 0 \implies \gamma'(t)^\top  \gamma''(t) = 0
$$


We define the arc-length of a curve $\gamma : [a, b] \rightarrow \R^2$ at $t$  to be 

$$
s_\gamma(t) := \int_a^t \| {\gamma}' (\tau) \|\text d\tau.
$$

Then the unit speed assumption leads to 

$$
s_\gamma(t) = \int_a^t  \text d \tau = |t - a| .
$$

## Arc-length Re-parameterization

Suppose $l_\gamma$  is the length of a regular curve $\gamma : [a, b ] \in \R^2$. We can use the arc-length function $s_\gamma : [a, b] \rightarrow [ 0, l_\gamma ]$  to re-parameterize $\gamma$  such

$$
\tilde \gamma = \gamma \circ \varphi,
$$

where $\varphi = s_\gamma^{-1}$. Two conditions needed to be checked are 1) the bijectivity and 2) smoothness of $\varphi$ . 

**Condition 1: Bijectivity**

Because $\gamma$  is a regular curve, we have

$$
\forall t : \| \gamma'(t) \| > 0 \implies  s'_\gamma(t) > 0.
$$

That is $s_\gamma (t)$  is strictly monotonic increasing. Therefore, $s_\gamma$  is bijective and $\varphi$  exists. 

**Condition 2 : Smoothness** 

Taking the derivative of $s_\gamma(t)$  w.r.t $t$ at some $\tau \in [a, b]$  yields 

$$
\begin{aligned}
\frac{\text d }{\text d t} s_\gamma(\tau) &=  \frac{\text d }{\text d t} \int_a^\tau \| \gamma'(t) \| \text d t  \\

&= \| \gamma '(\tau) \|,
\end{aligned}
$$

where we use the fundamental of calculus in the second step. Let’s write  at the coordinate functions of $\gamma$  explicitly

$$
\gamma(t)  = \begin{bmatrix}
\gamma_1(t) \\
\vdots \\
\gamma_d(t)
\end{bmatrix}.
$$

Because we assume that $\gamma$  is a smooth function (equivalently, each coordinate function $\gamma_i$ is smooth),  that means 

$$
\| \gamma'(t) \| = \sqrt{ \sum_{i=1}^d \gamma_i(t)^2}
$$

is smooth if $\sum_i \gamma_i(t)^2 \in$  $(0, \infty)$; that is the function $\| \gamma'(t) \|$  is infinitely many differentiable if the condition satisfies. Indeed, we have the condition because $\gamma$  is a regular curve, and this implies that

$$
\sum_{i=1}^d \gamma_i (t)^2 \in (0, \infty).
$$

Because $\frac{ \text d }{\text d t} s_\gamma(t) = \| \gamma'(t)\|$ is smooth, we can then conclude that $s_\gamma(t)$  is also smooth. Therefore, $\varphi = s^{-1}_\gamma(t)$   is also smooth.

 

### Consequence: Unit Speed

Suppose we have a curve $\gamma : [a, b] \rightarrow \R^d$  and its arc-length re-parameterization $\tilde \gamma = \gamma \circ \varphi$ . We can see that 

$$
\begin{aligned}

\| \tilde \gamma'(\tau)\|
&=  \| \gamma'(\varphi(\tau)) \cdot\varphi'(\tau) \|  \\
&\overset{(1)}{=}  \bigg \| \gamma'(\varphi(\tau)) \cdot \frac{ 1 }{ s_\gamma'(\varphi(\tau))} \bigg \| \\

&=  \bigg \| \gamma'(\varphi(\tau)) \cdot \frac{ 1 }{ \|\gamma'(\varphi(\tau))\|} \bigg \| \\

&=  \| \gamma'(\varphi(\tau))   \| \frac{ 1 }{ \|\gamma'(\varphi(\tau))\|}\\
&= 1,
\end{aligned}
$$

where (1) uses [the inverse function rule](https://en.m.wikipedia.org/wiki/Inverse_function_rule).

## Curve Energy and Shortest Path on Plane

Suppose we have points $a,  b \in \R$ and represented with  $x(a),  x(b)  \in \R^2$   and we would like to find a curve that minimizes the distance (or arc-length) between these two points. That is

$$
\gamma^\star \leftarrow \text{argmin}_\gamma L(\gamma_{(a, b)}) 
$$

It turns out that the minimizer of the length functional is also minimizes what so-called the energy 

$$
E(\gamma_{(a, b)}) = \int_a^b \gamma'(t)^\top \gamma'(t) \text dt.
$$

See discussion about the proof at https://math.stackexchange.com/a/669330.

We can then find the minimizer (a curve function) via calculus of variations. In particular, the Lagrangian is $\mathcal E := \gamma'(t) ^\top \gamma'(t)$ and

$$
\frac{\delta \mathcal E }{\delta \gamma(t)} - \frac{\text d }{\text d t} \frac{\delta \mathcal E }{\delta \gamma'(t)} = 0.
$$

First, we observe that The first time is zero. For the second term, we have 

$$
\frac{\delta \mathcal E}{\delta \gamma'(t)} = \gamma'(t) \in \R^2
$$

and the second term becomes 

$$
\frac{\text d }{\text d t} \frac{\delta \mathcal E }{\delta \gamma'(t)} = 2 \gamma''(t) \in \R^2.
$$

Integrating the results  above yields 

$$
\forall i \in \{1, 2\}: \int \gamma''_i(t) \text dt = 2 \gamma'_i(t) + C_{i,0} 
$$

and 

$$
\int \gamma'_i(t) + C_{i,0} \text dt = 2 \gamma_i(t) + C_{i, 0} t + C_{i,1},
$$

where $C_{i, 0}, C_{i, 1} \in \R$ are integration constants. We absorb the minus signs and $1/2$ in both constants and write

$$
\gamma_i(t) = C_{i, 0}t + C_{i, 1}.
$$

Therefore, we have a linear function for each coordinate. Finding the constants using the boundary values $x(a)$  and $x(b)$ yields 

$$
C_{:,0}  = \frac{1}{b-a}( x(b) - x(a) )   \qquad C_{:, 1} = x(a)  - C_{:,0}a
$$

**Acknowledgement**

I find these [Khan’s lectures](https://www.youtube.com/watch?v=QXRsgPw5wmc&list=PLdgVBOaXkb9DJjk8V0-RkXTnD4ZXUOFsc) are very helpful and throughout on these concepts. 

The toy curves figure is generated with [this notebook](https://colab.research.google.com/drive/1OC730vNzscGNaK-JSypXe_p38sUxo3FC#scrollTo=Bf5ERH1qFftu).